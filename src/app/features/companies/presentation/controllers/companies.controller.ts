
import { Controller, Post, Body, UseGuards, Req, Query, Get, Delete, ForbiddenException, UnauthorizedException, ValidationPipe, UsePipes, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { CompaniesUpsertCommand } from '../../application/commands/upsert/companies-upsert.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CompaniesUpsertRequest } from '../contracts/request/companies-upsert.request';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { CompaniesGetRequest } from '../contracts/request/companies-get.request';
import { CompaniesGetQuery } from '../../application/queries/get/companies-get.query';
import { CompaniesGetResult } from '../../application/results/companies-get.result';
import { CompaniesGetAllQuery } from '../../application/queries/getAll/companies-get-all.query';
import { CompaniesGetAllRequest } from '../contracts/request/companies-get-all.request';
import { CompaniesDeleteRequest } from '../contracts/request/companies-delete.request';
import { CompaniesDeleteCommand } from '../../application/commands/delete/companies-delete.command';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { CompaniesGetResponse } from '../contracts/response/companies-get.response';
import { CompaniesGetAllResponse } from '../contracts/response/companies-get-all.response';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
import { CompaniesGetMineQuery } from '../../application/queries/get/companies-get-mine-query';
import { CompaniesService } from '../../application/services/companies.service';
import { ObjectId } from 'mongodb';
import { CompaniesGetAllUsersResponse } from '../contracts/response/companies-get-all-users.response';
import { CompaniesUserGetAllQuery } from '../../application/queries/getAll/company-get-allusers';
import { UserCompaniesService } from '../../application/services/user-companies.service';
import { CompaniesGetAllAttachmentsResponse } from '../contracts/response/companies-get-all-Attachments.response';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/app/@core/configs/multer.config';
import { S3UploadService } from 'src/app/@core/shared/application/services/s3-upload.service';

@Controller(
  {
    path: 'web/companies',
  },
)
export class CompaniesController {
  public constructor(
    private readonly companiesService: CompaniesService,
    private readonly userCompaniesService: UserCompaniesService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Post('upsert')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'authorizationFile', maxCount: 1 },
      { name: 'registeringFile', maxCount: 1 },
      { name: 'logoMedia', maxCount: 1 },
    ],multerOptions,),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //CompaniesUpsertRequest
  public async upsert(
    @UploadedFiles()
    files: {
      authorizationFile?: Express.Multer.File[];
      registeringFile?: Express.Multer.File[];
      logoMedia?: Express.Multer.File[];
    },
    @Body() companiesUpsertRequest: any,
    @Req() req: any,
  ): Promise<AppResponse<CompaniesGetResponse>> {
    const { userId, roles } = req.user;
    let authorizationFileUrl: string | null = null;
    let registeringFileUrl: string | null = null;
    let logoMediaUrl: string | null = null;
    const folderPath = `${companiesUpsertRequest.registrationNumber}/attachments`;
    if (files.authorizationFile && files.authorizationFile[0]) {
      authorizationFileUrl = await S3UploadService.uploadFile(files.authorizationFile[0],folderPath);
    }
    if (files.registeringFile && files.registeringFile[0]) {
      registeringFileUrl = await S3UploadService.uploadFile(files.registeringFile[0],folderPath);
    }
    if (files.logoMedia && files.logoMedia[0]) {
      logoMediaUrl = await S3UploadService.uploadFile(files.logoMedia[0],folderPath);
    }
    companiesUpsertRequest.authorizationFileUrl = authorizationFileUrl;
    companiesUpsertRequest.registeringFileUrl = registeringFileUrl;
    companiesUpsertRequest.logoMedia = logoMediaUrl;
    console.log(companiesUpsertRequest,"DDD")
    let categoriesIds = companiesUpsertRequest.categoriesIds;
    try {
      categoriesIds = JSON.parse(categoriesIds);
    } catch (error) { }
    const command =
      new CompaniesUpsertCommand(
        companiesUpsertRequest.id === '' ? null : companiesUpsertRequest.id,
        String(companiesUpsertRequest.nameAr),
        companiesUpsertRequest.nameEn,
        companiesUpsertRequest.website,
        companiesUpsertRequest.address,
        companiesUpsertRequest.region,
        companiesUpsertRequest.city,
        companiesUpsertRequest.registrationNumber,
        companiesUpsertRequest.ownerType,
        companiesUpsertRequest.stampedAuthorizationFormMediaId,
        companiesUpsertRequest.registrationExpirationDate,
        companiesUpsertRequest.creationDate,
        companiesUpsertRequest.placeOfIssue,
        companiesUpsertRequest.turnover,
        companiesUpsertRequest.type,
        companiesUpsertRequest.activities,
        categoriesIds,
        companiesUpsertRequest.logoMedia,
        companiesUpsertRequest.authorizationFileUrl,
        companiesUpsertRequest.registeringFileUrl,
        companiesUpsertRequest.contactInfo,
        userId,
        companiesUpsertRequest.taxInformation,
        companiesUpsertRequest.deliveryAddress,
        companiesUpsertRequest.employeesNumber,
        companiesUpsertRequest.CompanyNr,
      );

    const result =
      await this
        .commandBus
        .execute<CompaniesUpsertCommand, AppResult<CompaniesGetResult>>(
          command,
        );
    //insert into user-company
    console.log(result,"result.data")
    if(result.data.id){
      await this.companiesService.addUserToCompany(
        new ObjectId(result.data.userId),
        new ObjectId(result.data.id),
        companiesUpsertRequest.ownerType,
      );
    }   
    
    
    const response =
      AppResponse
        .create<CompaniesGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Post('Admin/upsert')
  //CompaniesUpsertRequest
  public async Adminupsert(
    @Body() companiesUpsertRequest: any,
    @Req() req: any,
  ): Promise<AppResponse<CompaniesGetResponse>> {
    const { userId, roles } = req.user;
    if (!roles.includes('Admin')) {
      throw new UnauthorizedException('You do not have permission to update this company.');
    }

    const command =
      new CompaniesUpsertCommand(
        companiesUpsertRequest.id,
        String(companiesUpsertRequest.nameAr),
        companiesUpsertRequest.nameEn,
        companiesUpsertRequest.website,
        companiesUpsertRequest.address,
        companiesUpsertRequest.region,
        companiesUpsertRequest.city,
        companiesUpsertRequest.registrationNumber,
        companiesUpsertRequest.ownerType,
        companiesUpsertRequest.stampedAuthorizationFormMediaId,
        companiesUpsertRequest.registrationExpirationDate,
        companiesUpsertRequest.creationDate,
        companiesUpsertRequest.placeOfIssue,
        companiesUpsertRequest.turnover,
        companiesUpsertRequest.type,
        companiesUpsertRequest.activities,
        companiesUpsertRequest.categoriesIds,
        companiesUpsertRequest.logoMedia,
        companiesUpsertRequest.authorizationFileUrl,
        companiesUpsertRequest.registeringFileUrl,
        companiesUpsertRequest.contactInfo,
        companiesUpsertRequest.userId,
        companiesUpsertRequest.taxInformation,
        companiesUpsertRequest.deliveryAddress,
        companiesUpsertRequest.employeesNumber,
        companiesUpsertRequest.CompanyNr,
      ); 
    const result =
      await this
        .commandBus
        .execute<CompaniesUpsertCommand, AppResult<CompaniesGetResult>>(
          command,
        );
         //insert into user-company
    await this.companiesService.addUserToCompany(
      new ObjectId(result.data.userId),
      new ObjectId(result.data.id),
      companiesUpsertRequest.ownerType,
    );
    const response =
      AppResponse
        .create<CompaniesGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Delete('delete')
  public async delete(
    @Query() companiesDeleteRequest: CompaniesDeleteRequest,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId, roles } = req.user;

    const command =
      new CompaniesDeleteCommand(
        companiesDeleteRequest.id,
        userId,
      );

    const result =
      await this
        .commandBus
        .execute<CompaniesDeleteCommand, AppResult<null>>(
          command,
        );

    const response =
      AppResponse
        .create<null>(
          result.isSuccess,
          result.key,
          result.message,
          null,
          null,
          result.error,
        );

    return response;
  }

  @Get('get')
  public async get(
    @Query() companiesGetRequest: CompaniesGetRequest,
  ): Promise<AppResponse<CompaniesGetResponse>> {
    const query =
      new CompaniesGetQuery(
        companiesGetRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<CompaniesGetQuery, AppResult<CompaniesGetResult>>(
          query,
        );

    const response =
      AppResponse
        .create<CompaniesGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('getAll')
  public async getAll(
    @Query() companiesGetAllRequest: CompaniesGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<CompaniesGetAllResponse>>> {
    const { userId, roles } = req.user;   
    console.log(userId) 
    console.log(roles) 
    console.log(roles.some(item=>item === "Admin")) 
    const query =
      new CompaniesGetAllQuery(
        companiesGetAllRequest.pageSize,
        companiesGetAllRequest.pageNumber,
        companiesGetAllRequest.withPaging,
        companiesGetAllRequest.search,
        roles.some(item=>item === "Admin")?null:userId,
      );

    const result =
      await this
        .queryBus
        .execute<CompaniesGetAllQuery, AppResult<Array<CompaniesGetAllResponse>>>(
          query,
        );

    const response =
      AppResponse
        .create<Array<CompaniesGetAllResponse>>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          result.paging,
          result.error,
        );

    return response;
  }
  @Get('users/getAll')
  public async getUsersAll(
    @Req() req: any,
  ): Promise<AppResponse<Array<CompaniesGetAllResponse>>> {
    const {userId,pageSize,pageNumber,withPaging} = req.query;    
    console.log(userId)
    const query =
      new CompaniesGetAllQuery(
        pageSize,
        pageNumber,
        withPaging,
        "",
        userId,
      );

    const result =
      await this
        .queryBus
        .execute<CompaniesGetAllQuery, AppResult<Array<CompaniesGetAllResponse>>>(
          query,
        );

    const response =
      AppResponse
        .create<Array<CompaniesGetAllResponse>>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          result.paging,
          result.error,
        );

    return response;
    
  }
  //
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('getAllUsers')
  public async getAllUsers(
    @Req() req: any,
): Promise<AppResponse<Array<CompaniesGetAllUsersResponse>>> {
    const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;

    // Ensure ComapnyId is valid
    if (!ComapnyId) {
        return AppResponse.create(false, null, 'Company ID is required', null, null, null);
    }

    console.log(ComapnyId);

    // Call the service method to get users by company ID
    const users = await this.userCompaniesService.getAllUsersByCompanyId(ComapnyId);

    // Create the response
    const response = AppResponse.create<Array<CompaniesGetAllUsersResponse>>(
        true,  // Assuming the operation is successful
        null,
        'Users retrieved successfully',
        users,
        null, // You can set this to your paging info if needed
        null,
    );

    return response;
}
  //
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('getAllAttchments')
  public async getAllAttchments(
    @Req() req: any,
): Promise<AppResponse<Array<CompaniesGetAllAttachmentsResponse>>> {
    const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;

    // Ensure ComapnyId is valid
    if (!ComapnyId) {
        return AppResponse.create(false, null, 'Company ID is required', null, null, null);
    }

    console.log(ComapnyId);

    // Call the service method to get users by company ID
    //const users = await this.userCompaniesService.getAllUsersByCompanyId(ComapnyId);
    const Attachment=[]

    // Create the response
    const response = AppResponse.create<Array<CompaniesGetAllAttachmentsResponse>>(
        true,  // Assuming the operation is successful
        null,
        'Attachments retrieved successfully',
        Attachment,
        null, // You can set this to your paging info if needed
        null,
    );

    return response;
}
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('getAllItems')
  public async getAllItems(
    @Req() req: any,
): Promise<AppResponse<Array<CompaniesGetAllAttachmentsResponse>>> {
    const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;

    // Ensure ComapnyId is valid
    if (!ComapnyId) {
        return AppResponse.create(false, null, 'Company ID is required', null, null, null);
    }

    console.log(ComapnyId);

    // Call the service method to get users by company ID
    //const users = await this.userCompaniesService.getAllUsersByCompanyId(ComapnyId);
    const items=[]

    // Create the response
    const response = AppResponse.create<Array<CompaniesGetAllAttachmentsResponse>>(
        true,  // Assuming the operation is successful
        null,
        'items retrieved successfully',
        items,
        null, // You can set this to your paging info if needed
        null,
    );

    return response;
}

  //
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get("get/my")
  public async getmy(
    @Req() req: any,
  ): Promise<AppResponse<CompaniesGetResponse>> {
    const { userId } = req.user;
    console.log(userId)
    const query =
      new CompaniesGetMineQuery(
        userId
      );

    const result =
      await this
        .queryBus
        .execute<CompaniesGetMineQuery, AppResult<CompaniesGetResult>>(
          query,
        );
        
    const response =
      AppResponse
        .create<CompaniesGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

}