import { Controller, Post, Body, UseGuards, Req, Query, Get, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TendersGetResponse } from '../contracts/response/tenders/tenders-get.response';
import { TendersGetAllResponse } from '../contracts/response/tenders/tenders-get-all.response';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { TendersGetResult } from '../../application/results/tenders/tenders-get.result';
import { TendersGetAllResult } from '../../application/results/tenders/tenders-get-all.result';
import { TendersUpsertRequest } from '../contracts/request/tenders/tenders-upsert.request';
import { TendersGetRequest } from '../contracts/request/tenders/tenders-get.request';
import { TendersGetAllRequest } from '../contracts/request/tenders/tenders-get-all.request';
import { TendersDeleteRequest } from '../contracts/request/tenders/tenders-delete.request';
import { TendersGetQuery } from '../../application/queries/tenders/get/tenders-get.query';
import { TendersGetAllQuery } from '../../application/queries/tenders/getAll/tenders-get-all.query';
import { TendersUpsertCommand } from '../../application/commands/tenders/upsert/tenders-upsert.command';
import { TendersDeleteCommand } from '../../application/commands/tenders/delete/tenders-delete.command';
import { TendersChangeStatusCommand } from '../../application/commands/tenders/change-status/tenders-change-status.command';
import { TendersChangeStatusRequest } from '../contracts/request/tenders/tenders-change-status.request';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
import { TenderStatusEnum } from '../../domain/constants/enums/tender-status.enum';
import { CompanyService } from 'src/app/features/companies/application/services/getCompanyById';
import { TendersCronService } from '../services/tenders-cron.service';

@Controller(
  {
    path: 'web/tenders',
  },
)
export class TendersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly companyService: CompanyService,
    private readonly tendersCronService: TendersCronService,
  ) { }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post('upsert')
  public async upsert(
    @Body() tendersUpsertRequest: TendersUpsertRequest,
    @Req() req: any,
  ): Promise<AppResponse<TendersGetResponse>> {
    const { userId } = req.user;
    const command = new TendersUpsertCommand(
      tendersUpsertRequest.id? tendersUpsertRequest.id : null,
      tendersUpsertRequest.title,
      tendersUpsertRequest.minValue,
      tendersUpsertRequest.value,
      tendersUpsertRequest.endDate,
      tendersUpsertRequest.deliverDate,
      tendersUpsertRequest.type,
      tendersUpsertRequest.status? tendersUpsertRequest.status : TenderStatusEnum.PLANING,
      tendersUpsertRequest.categoriesIds,
      tendersUpsertRequest.region,
      tendersUpsertRequest.city,
      tendersUpsertRequest.fileName,
      tendersUpsertRequest.fileDescription,
      tendersUpsertRequest.fileId,
      tendersUpsertRequest.attachmentName,
      tendersUpsertRequest.attachmentDescription,
      tendersUpsertRequest.attachmentId,
      tendersUpsertRequest.attachmentRequired,
      tendersUpsertRequest.attachmentDeliverDays,
      tendersUpsertRequest.receiveDocumentsType,
      tendersUpsertRequest.Paylater,
      tendersUpsertRequest.contactInfo,
      tendersUpsertRequest.companyId? tendersUpsertRequest.companyId : null,
      userId,
      tendersUpsertRequest.products,
      tendersUpsertRequest.TenderNr,      
    );
    
    const result =
      await this
        .commandBus
        .execute<TendersUpsertCommand, AppResult<TendersGetResult>>(
          command,
        );

    return AppResponse
      .create<TendersGetResponse>(
        result.isSuccess,
        result.key,
        result.message,
        result.data,
        null,
        result.error,
      );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post('send')
  public async Send(
    @Body() tendersChangeStatusRequest: TendersChangeStatusRequest,
    @Req() req: any,
  ): Promise<AppResponse<TendersGetResponse>> {
    const { userId } = req.user;

    const command = new TendersChangeStatusCommand(
      tendersChangeStatusRequest.id,
      tendersChangeStatusRequest.status,
      null,
      userId,
    );

    const result =
      await this
        .commandBus
        .execute<TendersChangeStatusCommand, AppResult<TendersGetResult>>(
          command,
        );

    return AppResponse
      .create<TendersGetResponse>(
        result.isSuccess,
        result.key,
        result.message,
        result.data,

        null,
        result.error,
      );
  }

  @Post('changeStatus')
  public async changeStatus(
    @Body() tendersChangeStatusRequest: TendersChangeStatusRequest,
    @Req() req: any,
  ): Promise<AppResponse<TendersGetResponse>> {
    const { userId } = req.user;

    const command = new TendersChangeStatusCommand(
      tendersChangeStatusRequest.id,
      tendersChangeStatusRequest.status,
      tendersChangeStatusRequest.tenderQuotationId,
      userId,
    );

    const result =
      await this
        .commandBus
        .execute<TendersChangeStatusCommand, AppResult<TendersGetResult>>(
          command,
        );

    return AppResponse
      .create<TendersGetResponse>(
        result.isSuccess,
        result.key,
        result.message,
        result.data,

        null,
        result.error,
      );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Delete('delete')
  public async delete(
    @Query() tendersDeleteRequest: TendersDeleteRequest,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;

    const command = new TendersDeleteCommand(
      tendersDeleteRequest.id,
      userId,
    );

    const result =
      await this
        .commandBus
        .execute<TendersDeleteCommand, AppResult<null>>(
          command,
        );

    return AppResponse
      .create<null>(
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
    @Query() tendersGetRequest: TendersGetRequest,
  ): Promise<AppResponse<TendersGetResponse>> {
    const query =
      new TendersGetQuery(
        tendersGetRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<TendersGetQuery, AppResult<TendersGetResult>>(
          query,
        );

    return AppResponse
      .create<TendersGetResponse>(
        result.isSuccess,
        result.key,
        result.message,
        result.data,
        null,
        result.error,
      );
  }

  @Get('getAll')
  public async getAll(
    @Query() tendersGetAllRequest: TendersGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TendersGetAllResponse>>> {
    const { userId } = req.user || {};
    
    const query = new TendersGetAllQuery(
      tendersGetAllRequest.pageSize,
      tendersGetAllRequest.pageNumber,
      tendersGetAllRequest.withPaging,
      tendersGetAllRequest.search,
      tendersGetAllRequest.type,
      tendersGetAllRequest.status,
      tendersGetAllRequest.categoriesIds,
      tendersGetAllRequest.companyId,
      !userId?null:userId,
    );

    const result = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query,
    );

    const responseData = result.data ? result.data.map(
      tender =>
        TendersGetAllResponse
          .create(
            tender.id,
            tender.title,
            tender.minValue,
            tender.value,
            tender.endDate,
            tender.deliverDate,
            tender.type,
            tender.status,
            tender.categoriesIds,
            tender.categories,
            tender.region,
            tender.city,
            tender.attachmentRequired,
            tender.receiveDocumentsType,
            tender.Paylater,
            tender.companyId,
            tender.userId,
            tender.TenderNr,
          )
    ) : [];

    return AppResponse
      .create<Array<TendersGetAllResponse>>(
        result.isSuccess,
        result.key,
        result.message,
        responseData,
        result.paging,
        result.error,
      );
  }
  @Get('getAll/payment')
  public async getAllpayment(
    @Query() tendersGetAllRequest: TendersGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TendersGetAllResponse>>> {
    const { userId } = req.user || {};
    const statuses = [
      TenderStatusEnum.ACCEPTED,
      TenderStatusEnum.PAYMENT,
      TenderStatusEnum.PAYMENTCONFIRM,
      TenderStatusEnum.SENDING,
    ];
    const query = new TendersGetAllQuery(
      tendersGetAllRequest.pageSize,
      tendersGetAllRequest.pageNumber,
      tendersGetAllRequest.withPaging,
      tendersGetAllRequest.search,
      tendersGetAllRequest.type,
      statuses,
      tendersGetAllRequest.categoriesIds,
      tendersGetAllRequest.companyId,
      userId,
    );

    const result = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query,
    );

    const responseData = result.data ? result.data.map(
      tender =>
        TendersGetAllResponse
          .create(
            tender.id,
            tender.title,
            tender.minValue,
            tender.value,
            tender.endDate,
            tender.deliverDate,
            tender.type,
            tender.status,
            tender.categoriesIds,
            tender.categories,
            tender.region,
            tender.city,
            tender.attachmentRequired,
            tender.receiveDocumentsType,
            tender.Paylater,
            tender.companyId,
            tender.userId
          )
    ) : [];
    
    return AppResponse
      .create<Array<TendersGetAllResponse>>(
        result.isSuccess,
        result.key,
        result.message,
        responseData,
        result.paging,
        result.error,
      );
  }
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('getAll/Company')
  public async getAllbyCompany(
    @Query() tendersGetAllRequest: TendersGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TendersGetAllResponse>>> {
    const { companyId } = req.query;
    const { userId, roles } = req.user; 
    const query = new TendersGetAllQuery(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      companyId,
      null,
    );

    const result = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query,
    );

    const responseData = result.data ? result.data.map(
      tender =>
        TendersGetAllResponse
          .create(
            tender.id,
            tender.title,
            tender.minValue,
            tender.value,
            tender.endDate,
            tender.deliverDate,
            tender.type,
            tender.status,
            tender.categoriesIds,
            tender.categories,
            tender.region,
            tender.city,
            tender.attachmentRequired,
            tender.receiveDocumentsType,
            tender.Paylater,
            tender.companyId,
            tender.userId
          )
    ) : [];

    return AppResponse
      .create<Array<TendersGetAllResponse>>(
        result.isSuccess,
        result.key,
        result.message,
        responseData,
        result.paging,
        result.error,
      );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get('getMy')
  public async getMyAll(
    @Query() tendersGetAllRequest: TendersGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TendersGetAllResponse>>> {
    const { userId } = req.user || {};

    const query = new TendersGetAllQuery(
      tendersGetAllRequest.pageSize,
      tendersGetAllRequest.pageNumber,
      tendersGetAllRequest.withPaging,
      tendersGetAllRequest.search,
      tendersGetAllRequest.type,
      tendersGetAllRequest.status,
      tendersGetAllRequest.categoriesIds,
      tendersGetAllRequest.companyId,
      userId,
    );

    const result = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query,
    );
    const responseData = result.data
    ? await Promise.all(
        result.data
          .filter(item => item.userId === userId)
          .map(async (tender) => {
            // Fetch the company object
            const company = await this.companyService.getCompanyById(tender.companyId);
            
            return TendersGetAllResponse.create(
              tender.id,
              tender.title,
              tender.minValue,
              tender.value,
              tender.endDate,
              tender.deliverDate,
              tender.type,
              tender.status,
              tender.categoriesIds,
              tender.categories,
              tender.region,
              tender.city,
              tender.attachmentRequired,
              tender.receiveDocumentsType,
              tender.Paylater,
              tender.companyId,
              tender.userId,
              tender.TenderNr,
              company
               // Include the company object
            );
          })
      )
    : [];
    responseData
    return AppResponse
      .create<Array<TendersGetAllResponse>>(
        result.isSuccess,
        result.key,
        result.message,
        responseData,
        result.paging,
        result.error,
      );
  }
  @UseGuards(
    JwtAuthGuard,
  )
  @Get('getTotal/Closed')
  public async getAllTotal(
    @Req() req: any,
  ): Promise<{ total: number }> {
    const { userId } = req.user;
    const status = TenderStatusEnum.CLOSED;
    
    const query = new TendersGetAllQuery(
      10,
      1,
      false,
      null, 
      null, 
      status, 
      null, 
      null, 
      userId 
    );
    const openedTenders = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query
    );
    return { total: openedTenders.data ? openedTenders.data.length : 0 };
  }
  //data
  @UseGuards(
    JwtAuthGuard,
  )
  @Get('getTotal/ByStatus')
  public async getAllTotalByStatus(
    @Req() req: any,
  ): Promise<{ total: number; status: string }[]> {
    const { userId } = req.user;
    const query = new TendersGetAllQuery(
      10,
      1,
      false,
      null, 
      null, 
      null, 
      null, 
      null, 
      userId 
    );
    const Tenders = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query
    );
    // Create a map to count tenders by status
  const statusCountMap: { [key: string]: number } = {};

  if (Tenders.data.filter(item=>item.userId === userId)) {
    Tenders.data.filter(item=>item.userId === userId).forEach(tender => {
      // Assuming tender.status is available in each tender
      const status = tender.status; 
      if (statusCountMap[status]) {
        statusCountMap[status]++;
      } else {
        statusCountMap[status] = 1;
      }
    });
  }
  // Convert the status count map to an array of objects
  const result = Object.entries(statusCountMap).map(([status, total]) => ({ status, total }));

  return result;
  }
  @UseGuards(JwtAuthGuard)
@Get('run-cron-manually')
public async runCronManually(@Req() req: any): Promise<string> {
  await this.tendersCronService.checkAndCloseExpiredTenders();
  return 'Cron job executed manually!';
}
}
