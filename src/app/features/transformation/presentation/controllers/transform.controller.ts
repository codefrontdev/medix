import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Get,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFiles,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/app/@core/configs/multer.config';
import { S3UploadService } from 'src/app/@core/shared/application/services/s3-upload.service';
import { S3_BUCKET, s3Client } from 'src/app/@core/configs/s3.config';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { isEmpty } from 'class-validator';
import { TransformsUpsertCommand } from '../../applicatoin/commands/items/upsert/transforms-upsert.command';
import { TransformsChangeStatusCommand } from '../../applicatoin/commands/items/change-status/transforms-change-status.command';
import { TransformsDeleteCommand } from '../../applicatoin/commands/items/delete/transforms-delete.command';
import { TransfromsGetQuery } from '../../applicatoin/queries/items/get/transforms-get.query';
import { TransformsGetAllQuery } from '../../applicatoin/queries/items/getAll/stransforms-get-all.query';
import { TransformsGetAllResult } from '../../applicatoin/results/items/transforms-get-all.result';
import { TransformsRepository } from '../../persistence/repositories/stransforms.repository';
import { TransformsGetResponse } from '../contracts/response/transforms/transforms-get.response';
import { TransformsGetAllResponse } from '../contracts/response/transforms/transforms-get-all.response';
import { TransformsGetAllRequest } from '../contracts/request/transforms/transforms-get-all.request';
import { TransformsChangeStatusRequest } from '../contracts/request/transforms/transforms-change-status.request';
import { TransformsDeleteRequest } from '../contracts/request/transforms/transforms-delete.request';
import { TransformsGetRequest } from '../contracts/request/transforms/transforms-get.request';
import { TransformTypeEnum } from '../../domain/constants/enum/transform-type.enum';
import { Roles } from 'src/app/features/auth/application/decorators/roles.decorator';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { TransformsGetAllAdminResponse } from '../contracts/response/transforms/transforms-get-admin-all.response';
import { TransformsGetAllAdminQuery } from '../../applicatoin/queries/items/getAllAdmin/stransforms-get-all-admin.query';
import { TransformsGetAllAdminResult } from '../../applicatoin/results/items/transforms-get-all-admin.result';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { isUndefined } from 'util';



@Controller({
  path: 'web/Transforms',
})
export class TransformsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly transformsRepository: TransformsRepository,
  ) {
    console.log('QueryBus in Module:', queryBus);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upsert')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'attachment', maxCount: 20 },
      ],
      multerOptions,
    ),
  )
  public async upsert(
    @Body() body: any,
    @UploadedFiles() files: { attachment?: Express.Multer.File[] },
    @Req() req: any,
  ): Promise<AppResponse<TransformsGetResponse>> {
    const { userId } = req.user;
    console.log(body,"Body")
    console.log(files, "Uploaded Files");
    console.log(userId,"userId")
    try {
      const uploadedAttachments = files?.attachment
      ? await Promise.all(
          files.attachment.map(async (file) => {
            try {
              const folderPath = `${body.companyId}/attachments`;
              const uploadResult = await S3UploadService.uploadFile(file, folderPath);
              console.log(uploadResult, "Upload Result");
              return { 
                name:file.originalname,
                filepath: uploadResult 
              };
            } catch (uploadError) {
              console.error("Error uploading file:", uploadError);
              throw new InternalServerErrorException("File upload failed.");
            }
          }),
        )
      : [];

      /**/const metadata = [];
      const fullAttachments=uploadedAttachments.map((meta: any, index: number) => {
        console.log(meta)
        const filepath = uploadedAttachments[index]?.filepath || null;
        return new Attachment(meta.name, "Tranformation" ,  null, filepath);
      });
      console.log(fullAttachments,"fullAttachments")
      console.log(body.products,"fullAttachments")
      console.log(body.bankAccount,"fullAttachments")
      let transformRequest = body.transformRequest === 'true'?true:false
      let products = null 
      try{
        products = JSON.parse(body.products)
      }
      catch(e){
        console.log(e)
      }
      let bankAccount = null 
      try{
        bankAccount = JSON.parse(body.bankAccount)
      }
      catch(e){
        console.log(e)
      }

      console.log(products,"fullAttachments")
      
      console.log(bankAccount,"fullAttachments")

      const command = new TransformsUpsertCommand(
        body.id || null,
        body.title,
        body.status,
        body.buyerId || null,
        body.sellerId,
        userId,
        body.orderId || null,
        body.orderId === undefined?body.buyerId === undefined?TransformTypeEnum.WITHDRAW:TransformTypeEnum.TRANSFORM:TransformTypeEnum.ORDERTRASFORM,
        products,
        body.totalPrice,
        false,
        fullAttachments || [],
        false,
        bankAccount,
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
      console.error('Error during Transform upsert:', error);
      throw new InternalServerErrorException('An error occurred while saving the Transform.');
    }
  }
  //
  //
  @UseGuards(JwtAuthGuard)
  @Post('changeStatus')
  public async changeStatus(
    @Body() TransformsChangeStatusRequest: TransformsChangeStatusRequest,
    @Req() req: any,
  ): Promise<AppResponse<TransformsGetResponse>> {
    const { userId } = req.user;

    const command = new TransformsChangeStatusCommand(
      TransformsChangeStatusRequest.id,
      TransformsChangeStatusRequest.status,
      TransformsChangeStatusRequest.transformRequest,
      TransformsChangeStatusRequest.withdrawRequest,
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
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  public async delete(
    @Query() TransformsDeleteRequest: TransformsDeleteRequest,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;

    const transform = await this.transformsRepository.getById(TransformsDeleteRequest.id);
    if (!transform) {
      throw new NotFoundException('Transform not found');
    }

    const command = new TransformsDeleteCommand(TransformsDeleteRequest.id);

    const result = await this.commandBus.execute(command);

    return AppResponse.create(
      result.isSuccess,
      result.key,
      result.message,
      null,
      null,
      result.error,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  public async get(
    @Query() TransformsGetRequest: TransformsGetRequest,
  ): Promise<AppResponse<TransformsGetResponse>> {
    const query = new TransfromsGetQuery(TransformsGetRequest.id);

    const result = await this.queryBus.execute(query);

    return AppResponse.create(
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
    @Query() TransformsGetAllRequest: TransformsGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TransformsGetAllResponse>>> {
    const { userId } = req.user || {};
    const query = new TransformsGetAllQuery(
      TransformsGetAllRequest.pageSize || 10,
      TransformsGetAllRequest.pageNumber || 1,
      TransformsGetAllRequest.withPaging || false,
      TransformsGetAllRequest.search || null,
      TransformsGetAllRequest.status || null,
      TransformsGetAllRequest.buyerId || null,
      TransformsGetAllRequest.sellerId || null,
      null
    );
    console.log(query)

    const result = await this.queryBus.execute<
          TransformsGetAllQuery,
          AppResult<Array<TransformsGetAllResult>>
        >(query);
    //const result = await this.queryBus.execute(query);
    console.log('Registered Query Handlers:', Array.from(this.queryBus['handlers'].keys()));
    const responseData = result.data?.map((transform) =>
      TransformsGetAllResponse.create(
        transform.id,
        transform.title,
        transform.status,
        transform.buyerId,
        transform.sellerId,
        transform.userId,
        transform.orderId,
        transform.type,
        transform.products,
        transform.totalPrice,
        transform.transformRequest,
        transform.transformDoc,
        transform.withdrawRequest,
        transform.bankAccount,
        transform.createdAt,
      //  transform.updatedAt,
      ),
    );
    
    return AppResponse.create(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error,
    );
  }
  //Admin/getAll
  @UseGuards(JwtAuthGuard,RolesGuard)
@Get('Admin/getAll')
@Roles('Admin') 
public async adminGetAll(
  @Query() TransformsGetAllRequest: TransformsGetAllRequest,
  @Req() req: any,
): Promise<AppResponse<Array<TransformsGetAllAdminResponse>>> {
  const { userId } = req.user || {};
  

  const query = new TransformsGetAllAdminQuery(
    TransformsGetAllRequest.pageSize || 10,
    TransformsGetAllRequest.pageNumber || 1,
    TransformsGetAllRequest.withPaging || false,
    TransformsGetAllRequest.search || null,
    TransformsGetAllRequest.status || null,
    TransformsGetAllRequest.buyerId || null,
    TransformsGetAllRequest.sellerId || null,
    null, // No user-specific filtering for admin
  );

  const result = await this.queryBus.execute<
    TransformsGetAllAdminQuery,
    AppResult<Array<TransformsGetAllAdminResult>>
  >(query);
  

  const responseData = result.data?.map((transform) =>
    TransformsGetAllAdminResponse.create(
      transform.id,
      transform.title,
      transform.status,
      transform.buyerId,
      transform.sellerId,
      transform.userId,
      transform.orderId,
      transform.type,
      transform.products,
      transform.totalPrice,
      transform.transformRequest,
      transform.transformDoc,
      transform.withdrawRequest,
      transform.bankAccount,
      transform.createdAt,
      transform.updatedAt,
      transform.buyerCompany,
      transform.sellerCompany
    ),
  );

  return AppResponse.create(
    result.isSuccess,
    result.key,
    result.message,
    responseData,
    result.paging,
    result.error,
  );
}

}
