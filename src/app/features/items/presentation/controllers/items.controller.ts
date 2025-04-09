import { Controller, Post, Body, UseGuards, Req, Query, Get, Delete, BadRequestException, InternalServerErrorException, UseInterceptors, UploadedFile, NotFoundException, UploadedFiles } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ItemsGetResponse } from '../contracts/response/items/items-get.response';
import { ItemsGetAllResponse } from '../contracts/response/items/items-get-all.response';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { ItemsUpsertRequest } from '../contracts/request/items/items-upsert.request';
import { ItemsGetRequest } from '../contracts/request/items/items-get.request';
import { ItemsGetAllRequest } from '../contracts/request/items/items-get-all.request';
import { ItemsDeleteRequest } from '../contracts/request/items/items-delete.request';
import { ItemsChangeStatusRequest } from '../contracts/request/items/items-change-status.request';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
import { ItemsUpsertCommand } from '../../applicatoin/commands/items/upsert/items-upsert.command';
import { ItemsGetResult } from '../../applicatoin/results/items/items-get.result';
import { ItemsChangeStatusCommand } from '../../applicatoin/commands/items/change-status/items-change-status.command';
import { ItemsDeleteCommand } from '../../applicatoin/commands/items/delete/items-delete.command';
import { ItemsGetQuery } from '../../applicatoin/queries/items/get/items-get.query';
import { ItemsGetAllQuery } from '../../applicatoin/queries/items/getAll/items-get-all.query';
import { ItemsGetAllResult } from '../../applicatoin/results/items/items-get-all.result';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/app/@core/configs/multer.config';
import { S3UploadService } from 'src/app/@core/shared/application/services/s3-upload.service';
import { S3_BUCKET, s3Client } from 'src/app/@core/configs/s3.config';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ItemsRepository } from '../../persistence/repositories/items.repository';
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from 'class-validator';

@Controller({
  path: 'web/items',
})
export class ItemsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly itemsRepository: ItemsRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upsert')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'attachments', maxCount: 20 },
      ],
      multerOptions,
    ),
  )
  public async upsert(
    @Body() body: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; attachments?: Express.Multer.File[] },
    @Req() req: any,
  ): Promise<AppResponse<ItemsGetResponse>> {
    const { userId } = req.user;
    
    try {
      let imagePath = null;
      if (files?.image && files.image[0]) {
        const folderPath = `${body.companyId}/images`;
        imagePath = await S3UploadService.uploadFile(files.image[0], folderPath);
      } else {
        imagePath = body.imageUrl;
      }
      // Handle attachments upload
      let uploadedAttachments = [];
    if (files?.attachments && files.attachments.length > 0) {
      uploadedAttachments = await Promise.all(
        files.attachments.map(async (file) => {
          const folderPath = `${body.companyId}/attachments`;
          const filePath = await S3UploadService.uploadFile(file, folderPath);
          return { filepath: filePath };
        }),
      );
    }
    const metadata = JSON.parse(body.attachmentMetadata || '[]');
    const fullAttachments = metadata.map((meta: any, index: number) => ({
      ...meta,
      filepath: uploadedAttachments[index]?.filepath || null,
    }));
    /*
      let taggs = body.tags || '[]'
      try{
        taggs = JSON.parse(body.tags || '[]')
      }catch(err){
         let taggs1 = taggs.split(",")
        taggs = JSON.stringify(taggs1)
      }
        
      */
      // Prepare and execute command
      const command = new ItemsUpsertCommand(
        body.id  === undefined ?null:body.id ,
        body.name,
        body.SKUCode,
        body.manufacturer,
        body.brand,
        body.model,
        body.unit,
        !isEmpty(body.categories)?body.categories:body.tags,
        body.description ?? '',
        Number(body.price),
        body.vat ? Number(body.vat) : null,
        body.stock ? Number(body.stock) : 0,
        [], // Parse tags safely
        imagePath,
        fullAttachments,
        body.status ?? null,
        body.type,
        body.companyId,
        userId,
        body.ItemNR,
      );

      const result = await this.commandBus.execute(command);

      return AppResponse.create(
        result.isSuccess,
        result.key,
        result.message,
        result.data,
        null,
        result.error,
      );
    } catch (error) {
      console.error('Error during item upsert:', error);
      throw new InternalServerErrorException(
        'An error occurred while saving the item.',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeStatus')
  public async changeStatus(
    @Body() itemsChangeStatusRequest: ItemsChangeStatusRequest,
    @Req() req: any,
  ): Promise<AppResponse<ItemsGetResponse>> {
    const { userId } = req.user;

    const command = new ItemsChangeStatusCommand(
      itemsChangeStatusRequest.id,
      itemsChangeStatusRequest.status,
      userId,
    );

    const result = await this.commandBus.execute<
      ItemsChangeStatusCommand,
      AppResult<ItemsGetResult>
    >(command);

    return AppResponse.create<ItemsGetResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      null,
      result.error,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  public async delete(
    @Query() itemsDeleteRequest: ItemsDeleteRequest,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    
    const item = await this.itemsRepository.getById(itemsDeleteRequest.id);
    if (!item) {
      throw new NotFoundException("Item not found");
    }
    // Delete the item from storage (if image exists)
    if (item.image) {
      try {
        const imageKey = item.image.split('/').pop(); // Extract the image key from the URL
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: `${item.userId}/images/${imageKey}`, // Use the correct path prefix for your bucket
          })
        );
      } catch (error) {
        console.error("Error deleting image from S3:", error);
        throw new InternalServerErrorException("Failed to delete image from S3.");
      }
    }
    const command = new ItemsDeleteCommand(
      itemsDeleteRequest.id
    );

    const result = await this.commandBus.execute<
      ItemsDeleteCommand,
      AppResult<null>
    >(command);

    return AppResponse.create<null>(
      result.isSuccess,
      result.key,
      result.message,
      null,
      null,
      result.error,
    );
  }

  @Get('get')
  public async get(
    @Query() itemsGetRequest: ItemsGetRequest,
  ): Promise<AppResponse<ItemsGetResponse>> {
    const query = new ItemsGetQuery(itemsGetRequest.id);

    const result = await this.queryBus.execute<
      ItemsGetQuery,
      AppResult<ItemsGetResult>
    >(query);

    return AppResponse.create<ItemsGetResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      null,
      result.error,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  public async getAll(
    @Query() itemsGetAllRequest: ItemsGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<ItemsGetAllResponse>>> {
    const { userId } = req.user || {};
    
    
    const query = new ItemsGetAllQuery(
      itemsGetAllRequest.pageSize,
      itemsGetAllRequest.pageNumber,
      itemsGetAllRequest.withPaging,
      itemsGetAllRequest.search,
      itemsGetAllRequest.type,
      itemsGetAllRequest.status,
      itemsGetAllRequest.companyId,  
      userId,          
    );

    const result = await this.queryBus.execute<
      ItemsGetAllQuery,
      AppResult<Array<ItemsGetAllResult>>
    >(query);

    const responseData = result.data?.map(item =>
      ItemsGetAllResponse.create(
        item.id,
        item.name,
        item.SKUCode,
        item.manufacturer,
        item.brand,
        item.model,
        item.unit,
        item.categories,
        item.description,
        item.price,
        item.vat,
        item.stock,
        item.tags,
        item.image,
        item.type,
        item.status,
        item.companyId,
        item.userId,
        item.ItemNR,
      ),
    );

    return AppResponse.create<Array<ItemsGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error,
    );
  }
}

