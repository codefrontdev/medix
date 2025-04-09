import { Controller, Post, Body, UseGuards, Req, Query, Get, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { TenderQuotationsDeleteRequest } from '../contracts/request/tender-quotations/tender-quotations-delete.request';
import { TenderQuotationsGetRequest } from '../contracts/request/tender-quotations/tender-quotations-get.request';
import { TenderQuotationsGetAllResponse } from '../contracts/response/tenders-quotations/tender-quotations-get-all.response';
import { TenderQuotationsGetAllQuery } from '../../application/queries/tender-quotations/getAll/tender-quotations-get-all.query';
import { TenderQuotationsGetAllRequest } from '../contracts/request/tender-quotations/tender-quotations-get-all.request';
import { TenderQuotationsGetQuery } from '../../application/queries/tender-quotations/get/tender-quotations-get.query';
import { TenderQuotationsDeleteCommand } from '../../application/commands/tender-quotations/delete/tender-quotations-delete.command';
import { TenderQuotationsUpsertCommand } from '../../application/commands/tender-quotations/upsert/tender-quotations-upsert.command';
import { TenderQuotationsUpsertRequest } from '../contracts/request/tender-quotations/tender-quotations-upsert.request';
import { TenderQuotationsGetResponse } from '../contracts/response/tenders-quotations/tender-quotations-get.response';
import { TenderQuotationsGetResult } from '../../application/results/tender-quotations/tender-quotations-get.result';
import { TenderQuotationsGetAllResult } from '../../application/results/tender-quotations/tender-quotations-get-all.result';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
//
import { TendersGetAllQueryj } from '../../application/queries/tenders/getAll/tenders-get-all-J.query';
import { TendersGetAllResult } from '../../application/results/tenders/tenders-get-all.result';
import { TenderQuotationsGetAllQueryJ } from '../../application/queries/tender-quotations/getAll/tender-quotations-get-all-J.query';
import { TendersGetAllQuery } from '../../application/queries/tenders/getAll/tenders-get-all.query';
import { TenderStatusEnum } from '../../domain/constants/enums/tender-status.enum';
import { TrendesResponse } from '../contracts/response/tenders/trendes.response';
import { TendersGetQuery } from '../../application/queries/tenders/get/tenders-get.query';
import { TendersGetResult } from '../../application/results/tenders/tenders-get.result';
import { TendersUpdateStatusCommand } from '../../application/queries/tender-quotations/update/tenders-update-status-query';
import { TenderQuotationsUpdateStatusCommand } from '../../application/queries/tender-quotations/update/tenders-quatation-update-status-query';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { CompaniesRepository } from 'src/app/features/companies/persistence/repositories/companies.repository';
import { TenderQuotationsGetAllQueryj2 } from '../../application/queries/tender-quotations/getAll/tender-quotations-get-all-J2.query';
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller(
  {
    path: 'web/tenderQuotations',
  },
)
export class TenderQuotationsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly companiesRepository: CompaniesRepository,
  ) { }

  @Post('upsert')
  public async upsert(
    @Body() tenderQuotationsUpsertRequest: TenderQuotationsUpsertRequest,
    @Req() req: any,
  ): Promise<AppResponse<TenderQuotationsGetResponse>> {
    const { userId } = req.user;
    const products = tenderQuotationsUpsertRequest.products.map((product) => ({
      productId: product.productId, // Convert string to ObjectId
      unitName: product.unitName,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      attachment: product.attachment,
      image: product.image,
      notice: product.notice,
      SKUCode	: product.SKUCode	,
      vat: product.vat,
    }));
    const command = new TenderQuotationsUpsertCommand(
      tenderQuotationsUpsertRequest.id,
      products,
      tenderQuotationsUpsertRequest.paymentMethod,
      tenderQuotationsUpsertRequest.DeadLineDate,
      tenderQuotationsUpsertRequest.DeliveryMethod,
      tenderQuotationsUpsertRequest.contactMethod,
      tenderQuotationsUpsertRequest.deliverDays,
      tenderQuotationsUpsertRequest.status,
      tenderQuotationsUpsertRequest.tenderId,
      tenderQuotationsUpsertRequest.companyId,
      userId,
      tenderQuotationsUpsertRequest.OpportunityNr
    );

    const result =
      await this
        .commandBus
        .execute<TenderQuotationsUpsertCommand, AppResult<TenderQuotationsGetResult>>(
          command,
        );

    return AppResponse
      .create<TenderQuotationsGetResponse>(
        result.isSuccess,
        result.key,
        result.message,
        result.data,

        null,
        result.error,
      );
  }

  @Delete('delete')
  public async delete(
    @Query() tenderQuotationsDeleteRequest: TenderQuotationsDeleteRequest,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;

    const command = new TenderQuotationsDeleteCommand(
      tenderQuotationsDeleteRequest.id,
      userId,
    );

    const result =
      await this
        .commandBus
        .execute<TenderQuotationsDeleteCommand, AppResult<null>>(
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
    @Query() tenderQuotationsGetRequest: TenderQuotationsGetRequest,
  ): Promise<AppResponse<TenderQuotationsGetResponse>> {
    const query = new TenderQuotationsGetQuery(
      tenderQuotationsGetRequest.id,
    );

    const result =
      await this
        .queryBus
        .execute<TenderQuotationsGetQuery, AppResult<TenderQuotationsGetResult>>(
          query,
        );

    return AppResponse
      .create<TenderQuotationsGetResponse>(
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
    @Query() tenderQuotationsGetAllRequest: TenderQuotationsGetAllRequest,
    @Req() req: any,
  ): Promise<AppResponse<Array<TenderQuotationsGetAllResponse>>> {
    const { userId } = req.user;

    const query = new TenderQuotationsGetAllQuery(
      tenderQuotationsGetAllRequest.pageSize,
      tenderQuotationsGetAllRequest.pageNumber,
      tenderQuotationsGetAllRequest.withPaging,
      tenderQuotationsGetAllRequest.status,
      tenderQuotationsGetAllRequest.tenderId,
      userId,
    );

    const result =
      await this
        .queryBus
        .execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
          query,
        );

    const responseData =
      result.data ?
        result.data.map(
          tenderQuotation =>
            TenderQuotationsGetAllResponse
              .create(
                tenderQuotation.id,
                /*
                tenderQuotation.value,
                tenderQuotation.description,
                */
                tenderQuotation.products,
                tenderQuotation.paymentMethod,
                tenderQuotation.DeadLineDate,
                tenderQuotation.DeliveryMethod,
                tenderQuotation.contactMethod,
                tenderQuotation.deliverDays,
                tenderQuotation.status,
                tenderQuotation.tenderId,
                tenderQuotation.companyId,
                tenderQuotation.company,
                tenderQuotation.userId,
                tenderQuotation.OpportunityNr,
              )
        )
        :
        [];

    return AppResponse
      .create<Array<TenderQuotationsGetAllResponse>>(
        result.isSuccess,
        result.key,
        result.message,
        responseData,
        result.paging,
        result.error,
      );
  }
  @Get('getTotal')
  public async getTotal(
    @Req() req: any,
  ): Promise<{ total: number }> {
  
    const { userId } = req.user;
    //const status = TenderStatusEnum.PLANING;;
    
    const query = new TendersGetAllQuery(
      10,
      1,
      false,
      null, 
      null, 
      null, 
      null, 
      null, 
      null 
    );
    const openedTenders = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query
    );
  
    const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
    console.log(tenderIds,"tenderIds")
    const query2 = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      tenderIds ? tenderIds : null,
      userId
    );
    const totalTenderQuestions = await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
      query2
    );
    return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
  }
  @Get('getTotal/Opened')
  public async getTotalOpened(
    @Req() req: any,
  ): Promise<{ total: number }> {
  
    const { userId } = req.user;
    const status = TenderStatusEnum.OPENED;;
    
    const query = new TendersGetAllQuery(
      10,
      1,
      false,
      null, 
      null, 
      status, 
      null, 
      null, 
      null 
    );
    const openedTenders = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query
    );
    console.log(openedTenders)
    console.log(userId)
    const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
  
    const query2 = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      tenderIds ? tenderIds : null,
      userId
    );
    const totalTenderQuestions = await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
      query2
    );
    return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
  }
  @Get('getTotal/Closed')
  public async getTotalClosed(
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
      null 
    );
    const openedTenders = await this.queryBus.execute<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>>(
      query
    );
    console.log(openedTenders)
    console.log(userId)
    const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
  
    const query2 = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      tenderIds ? tenderIds : null,
      userId
    );
    const totalTenderQuestions = await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
      query2
    );
    return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
  }
  //
  @Get('getTotal/ByStatus')
public async getTotalByStatus(@Req() req: any): Promise<{ totals: Record<string, number> }> {
  const { userId } = req.user;
  const company = await this.companiesRepository.getCompanyByUserId(userId)
  // Define all statuses you want to retrieve totals for
  const statuses = [
    TenderStatusEnum.PENDING,
    TenderStatusEnum.ACCEPTED,
    TenderStatusEnum.FINISHED,
    TenderStatusEnum.RECEIVING,
    TenderStatusEnum.SENDING,
  ];
  console.log(statuses,"statuses")
  const totals: Record<string, number> = {};

  for (const status of statuses) {
    // Fetch tenders for each status
    const query = new TenderQuotationsGetAllQueryj2(
      10,
      1,
      false,
      status, 
      null,
      null, 
      company._id
    );

    const tendersResult = await this.queryBus.execute<TenderQuotationsGetAllQueryj2, AppResult<Array<TendersGetAllResult>>>(
      query
    );
/**/
    const tenderIds = tendersResult.data ? tendersResult.data.map(tender => tender.id) : [];
    console.log(tenderIds,"tenderIds")
    // Fetch tender quotations for the tenders of this status
    if(tenderIds.length > 0){
       // Save the total count for this status
    totals[status] = tendersResult.data ? tendersResult.data.length : 0;
    }else{
      totals[status] = 0;
    }
  }

  return { totals };
}
  //getAll/Opened
  @Get('getAll/All/Opened')
  public async getTotalAllOpened(
    @Req() req: any,
  ): Promise<{ total: number }> {
    const { userId } = req.user;
    const status = TenderStatusEnum.OPENED;;
    
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

    return { total: openedTenders.data.filter(item=>item.userId === userId) ? openedTenders.data.filter(item=>item.userId === userId).length : 0 };
  }
  //getAll/All/Closed
  @Get('getAll/All/Closed')
  public async getTotalAllCLOSED(
    @Req() req: any,
  ): Promise<{ total: number }> {
  
    const status = TenderStatusEnum.CLOSED;;
    const { userId } = req.user;
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
    console.log(openedTenders)
    console.log(userId)
    return { total: openedTenders.data.filter(item=>item.userId === userId) ? openedTenders.data.filter(item=>item.userId === userId).length : 0};
  }
  //getAll/All/Mine
  @Get('getAll/All/Mine')
  public async getTotalAllMine(
    @Req() req: any,
  ): Promise<{ total: number }> {
    const { userId } = req.user;
    console.log(userId,"userId")
    const query = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      null,
      userId,
    );
    const openedTenders = await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetResult>>>(
      query
    );  
    console.log(openedTenders.data.filter(item=>item.userId === userId))
    return { total: openedTenders.data.filter(item=>item.userId === userId) ? openedTenders.data.filter(item=>item.userId === userId).length : 0 };
  }
  @UseGuards(
    JwtAuthGuard,
  )
  //tenderQuotations/getAll/All
  @Get('getAll/All')
  public async getAllTrenders(
    @Req() req: any,
  ): Promise<AppResponse<Array<TenderQuotationsGetAllResponse>>> {
    const { userId,role } = req.user;
    
    const query = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      null,
      role === "Seller"?userId:null,
    );

    // Fetch all tender quotations
    const result =
      await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
        query,
      );
    console.log(result)
    console.log(userId)
    // Create initial response array from tender quotations
    const response1 =
      result.data ?
        result.data.map(tenderQuotation =>
          TenderQuotationsGetAllResponse.create(
            tenderQuotation.id,
            /*tenderQuotation.value,
            tenderQuotation.description,*/
            tenderQuotation.products,
            tenderQuotation.paymentMethod,
            tenderQuotation.DeadLineDate,
            tenderQuotation.DeliveryMethod,
            tenderQuotation.contactMethod,
            tenderQuotation.deliverDays,
            tenderQuotation.status,
            tenderQuotation.tenderId,
            tenderQuotation.companyId,
            tenderQuotation.company,
            tenderQuotation.userId,
            tenderQuotation.OpportunityNr,
          )
        )
        : [];
    
      // Use Promise.all to wait for all tender detail fetch promises to resolve
    const responseData =[]
    await Promise.all(
      response1.map(async item => {
        const query1 = new TendersGetQuery(item.tenderId);

        const result1 = await this.queryBus.execute<TendersGetQuery, AppResult<TendersGetResult>>(
          query1,
        );
  
        // Check if result1 is successful before accessing the data
        const tenderData = result1.isSuccess ? result1.data : null;
        console.log(tenderData)
        console.log(userId)
        if(tenderData !== null){
        if(req.user.roles.includes("Seller")){ 
          if(item.userId === userId){
            responseData.push({
            ...item,
            tender: tenderData // Assign the fetched tender data to the item
          })
          } 
        }else{
          if(tenderData.userId === userId){
            responseData.push({
            ...item,
            tender: tenderData // Assign the fetched tender data to the item
          })
          } 
        }
       
        } 
      })
    );
    responseData.filter(item=>item !== null)
    return AppResponse.create<Array<TenderQuotationsGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error,
    );
  }
  @Get('getAll/Offert')
  public async getAllOffertTrenders(
    @Req() req: any,
  ): Promise<AppResponse<Array<TenderQuotationsGetAllResponse>>> {
    const { userId } = req.user;
    const { OfferId } = req.query;
    const query = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      OfferId,
      null,
    );

    // Fetch all tender quotations
    const result =
      await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
        query,
      );
    // Create initial response array from tender quotations
    const response1 =
      result.data ?
        result.data.filter(item=>item.tenderId == OfferId).map(tenderQuotation =>
          TenderQuotationsGetAllResponse.create(
            tenderQuotation.id,
            /*tenderQuotation.value,
            tenderQuotation.description,
            */
            tenderQuotation.products,
            tenderQuotation.paymentMethod,
            tenderQuotation.DeadLineDate,
            tenderQuotation.DeliveryMethod,
            tenderQuotation.contactMethod,
            tenderQuotation.deliverDays,
            tenderQuotation.status,
            tenderQuotation.tenderId,
            tenderQuotation.companyId,
            tenderQuotation.company,
            tenderQuotation.userId,
            tenderQuotation.OpportunityNr,
          )
        )
        : [];
    
    // Use Promise.all to wait for all tender detail fetch promises to resolve
    const responseData = await Promise.all(
      response1.map(async item => {
        const query1 = new TendersGetQuery(item.tenderId);
  
        const result1 = await this.queryBus.execute<TendersGetQuery, AppResult<TendersGetResult>>(
          query1,
        );
  
        // Check if result1 is successful before accessing the data
        const tenderData = result1.isSuccess ? result1.data : null;
  
        return {
          ...item,
          tender: tenderData // Assign the fetched tender data to the item
        };
      })
    );
  
    return AppResponse.create<Array<TenderQuotationsGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error,
    );
  }
  @Get('getAll/MyOffert')
  public async getAllMyOffertTrenders(
    @Req() req: any,
  ): Promise<AppResponse<Array<TenderQuotationsGetAllResponse>>> {
    const { userId } = req.user;
    const { OfferId } = req.query;
    const query = new TenderQuotationsGetAllQuery(
      10,
      1,
      false,
      null,
      OfferId,
      userId,
    );

    // Fetch all tender quotations
    const result =
      await this.queryBus.execute<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>>(
        query,
      );
    // Create initial response array from tender quotations
    const response1 =
      result.data ?
        result.data.filter(item=>item.tenderId == OfferId).map(tenderQuotation =>
          TenderQuotationsGetAllResponse.create(
            tenderQuotation.id,
            /*tenderQuotation.value,
            tenderQuotation.description,
            */
            tenderQuotation.products,
            tenderQuotation.paymentMethod,
            tenderQuotation.DeadLineDate,
            tenderQuotation.DeliveryMethod,
            tenderQuotation.contactMethod,
            tenderQuotation.deliverDays,
            tenderQuotation.status,
            tenderQuotation.tenderId,
            tenderQuotation.companyId,
            tenderQuotation.company,
            tenderQuotation.userId,
            tenderQuotation.OpportunityNr,
          )
        )
        : [];
    
    // Use Promise.all to wait for all tender detail fetch promises to resolve
    const responseData = await Promise.all(
      response1.map(async item => {
        const query1 = new TendersGetQuery(item.tenderId);
  
        const result1 = await this.queryBus.execute<TendersGetQuery, AppResult<TendersGetResult>>(
          query1,
        );
  
        // Check if result1 is successful before accessing the data
        const tenderData = result1.isSuccess ? result1.data : null;
  
        return {
          ...item,
          tender: tenderData // Assign the fetched tender data to the item
        };
      })
    );
  
    return AppResponse.create<Array<TenderQuotationsGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error,
    );
  }
  @Put('cancelled')
  public async cancelled( @Query('id') id: string,
  @Req() req: any,
): Promise<AppResponse<null>> {
  const { userId } = req.user;
  console.log(userId)
  console.log(req.body.quatationID)
  try {
    const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
      req.body.quatationID,
      TenderStatusEnum.CANCELLED,
      userId,
    );
    const quotationResult = await this.commandBus.execute<
      TenderQuotationsUpdateStatusCommand,
      AppResult<null>
    >(updateQuotationCommand);

    return AppResponse.create<null>(
      quotationResult.isSuccess,
      quotationResult.key,
      quotationResult.message,
      null,
      null,
      quotationResult.error,
    );
  }
  catch (error) {
    console.log(error)
    return AppResponse.create<null>(false, 'ERROR', 'Failed to cancel tender', null, null, error);
  }
}
  @Put('accept')
  public async accept(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    console.log(userId)
    console.log(req.body.quatationID)
    try {
      const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
        req.body.quatationID,
        TenderStatusEnum.ACCEPTED,
        userId,
      );
      const quotationResult = await this.commandBus.execute<
        TenderQuotationsUpdateStatusCommand,
        AppResult<null>
      >(updateQuotationCommand);

      if (!quotationResult.isSuccess) {
        return AppResponse.create<null>(
          false,
          quotationResult.key,
          quotationResult.message,
          null,
          null,
          quotationResult.error,
        );
      }
       // Fetch the tenderId from the Quotation
       const quotationQuery = new TenderQuotationsGetQuery(req.body.quatationID);
       const quotationData = await this.queryBus.execute<
         TenderQuotationsGetQuery,
         AppResult<TenderQuotationsGetResult>
       >(quotationQuery);
 
       if (!quotationData.isSuccess || !quotationData.data) {
         return AppResponse.create<null>(
           false,
           quotationData.key,
           quotationData.message,
           null,
           null,
           quotationData.error,
         );
       }
 
       const tenderId = quotationData.data.tenderId;
 
       // Update the status of the Opportunity to "Accept"
       const updateTenderCommand = new TendersUpdateStatusCommand(
         tenderId,
         TenderStatusEnum.ACCEPTED,
         userId,
       );
       const tenderResult = await this.commandBus.execute<
         TendersUpdateStatusCommand,
         AppResult<null>
       >(updateTenderCommand);
 
       return AppResponse.create<null>(
         tenderResult.isSuccess,
         tenderResult.key,
         tenderResult.message,
         null,
         null,
         tenderResult.error,
       );
    }
    catch (error) {
      console.log(error)
      return AppResponse.create<null>(false, 'ERROR', 'Failed to accept tender', null, null, error);
    }
  }

  @Put('pay/request')
  public async Payrequest(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    console.log(userId)
    console.log(req.body.quatationID)
    try {
      const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
        req.body.quatationID,
        TenderStatusEnum.PAYMENT,
        userId,
      );
      const quotationResult = await this.commandBus.execute<
        TenderQuotationsUpdateStatusCommand,
        AppResult<null>
      >(updateQuotationCommand);

      if (!quotationResult.isSuccess) {
        return AppResponse.create<null>(
          false,
          quotationResult.key,
          quotationResult.message,
          null,
          null,
          quotationResult.error,
        );
      }
       // Fetch the tenderId from the Quotation
       const quotationQuery = new TenderQuotationsGetQuery(req.body.quatationID);
       const quotationData = await this.queryBus.execute<
         TenderQuotationsGetQuery,
         AppResult<TenderQuotationsGetResult>
       >(quotationQuery);
 
       if (!quotationData.isSuccess || !quotationData.data) {
         return AppResponse.create<null>(
           false,
           quotationData.key,
           quotationData.message,
           null,
           null,
           quotationData.error,
         );
       }
 
       const tenderId = quotationData.data.tenderId;
 
       // Update the status of the Opportunity to "Accept"
       const updateTenderCommand = new TendersUpdateStatusCommand(
         tenderId,
         TenderStatusEnum.PAYMENT,
         userId,
       );
       const tenderResult = await this.commandBus.execute<
         TendersUpdateStatusCommand,
         AppResult<null>
       >(updateTenderCommand);
 
       return AppResponse.create<null>(
         tenderResult.isSuccess,
         tenderResult.key,
         tenderResult.message,
         null,
         null,
         tenderResult.error,
       );
    }
    catch (error) {
      console.log(error)
      return AppResponse.create<null>(false, 'ERROR', 'Failed to accept tender', null, null, error);
    }
  }
  @Put('send')
  public async Send(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    console.log(userId)
    console.log(req.body.quatationID)
    try {
      const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
        req.body.quatationID,
        TenderStatusEnum.SENDING,
        userId,
      );
      const quotationResult = await this.commandBus.execute<
        TenderQuotationsUpdateStatusCommand,
        AppResult<null>
      >(updateQuotationCommand);

      if (!quotationResult.isSuccess) {
        return AppResponse.create<null>(
          false,
          quotationResult.key,
          quotationResult.message,
          null,
          null,
          quotationResult.error,
        );
      }
       // Fetch the tenderId from the Quotation
       const quotationQuery = new TenderQuotationsGetQuery(req.body.quatationID);
       const quotationData = await this.queryBus.execute<
         TenderQuotationsGetQuery,
         AppResult<TenderQuotationsGetResult>
       >(quotationQuery);
 
       if (!quotationData.isSuccess || !quotationData.data) {
         return AppResponse.create<null>(
           false,
           quotationData.key,
           quotationData.message,
           null,
           null,
           quotationData.error,
         );
       }
 
       const tenderId = quotationData.data.tenderId;
 
       // Update the status of the Opportunity to "Accept"
       const updateTenderCommand = new TendersUpdateStatusCommand(
         tenderId,
         TenderStatusEnum.SENDING,
         userId,
       );
       const tenderResult = await this.commandBus.execute<
         TendersUpdateStatusCommand,
         AppResult<null>
       >(updateTenderCommand);
 
       return AppResponse.create<null>(
         tenderResult.isSuccess,
         tenderResult.key,
         tenderResult.message,
         null,
         null,
         tenderResult.error,
       );
    }
    catch (error) {
      console.log(error)
      return AppResponse.create<null>(false, 'ERROR', 'Failed to accept tender', null, null, error);
    }
  }
  @Put('receive')
  public async receive(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    console.log(userId)
    console.log(req.body.quatationID)
    try {
      const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
        req.body.quatationID,
        TenderStatusEnum.RECEIVING,
        userId,
      );
      const quotationResult = await this.commandBus.execute<
        TenderQuotationsUpdateStatusCommand,
        AppResult<null>
      >(updateQuotationCommand);

      if (!quotationResult.isSuccess) {
        return AppResponse.create<null>(
          false,
          quotationResult.key,
          quotationResult.message,
          null,
          null,
          quotationResult.error,
        );
      }
       // Fetch the tenderId from the Quotation
       const quotationQuery = new TenderQuotationsGetQuery(req.body.quatationID);
       const quotationData = await this.queryBus.execute<
         TenderQuotationsGetQuery,
         AppResult<TenderQuotationsGetResult>
       >(quotationQuery);
 
       if (!quotationData.isSuccess || !quotationData.data) {
         return AppResponse.create<null>(
           false,
           quotationData.key,
           quotationData.message,
           null,
           null,
           quotationData.error,
         );
       }
 
       const tenderId = quotationData.data.tenderId;
 
       // Update the status of the Opportunity to "Accept"
       const updateTenderCommand = new TendersUpdateStatusCommand(
         tenderId,
         TenderStatusEnum.FINISHED,
         userId,
       );
       const tenderResult = await this.commandBus.execute<
         TendersUpdateStatusCommand,
         AppResult<null>
       >(updateTenderCommand);
 
       return AppResponse.create<null>(
         tenderResult.isSuccess,
         tenderResult.key,
         tenderResult.message,
         null,
         null,
         tenderResult.error,
       );
    }
    catch (error) {
      console.log(error)
      return AppResponse.create<null>(false, 'ERROR', 'Failed to accept tender', null, null, error);
    }
  }
  @Put('send/request')
  public async Sendrequest(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    console.log(userId)
    console.log(req.body.quatationID)
    try {
      const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
        req.body.quatationID,
        TenderStatusEnum.SENDING,
        userId,
      );
      const quotationResult = await this.commandBus.execute<
        TenderQuotationsUpdateStatusCommand,
        AppResult<null>
      >(updateQuotationCommand);

      if (!quotationResult.isSuccess) {
        return AppResponse.create<null>(
          false,
          quotationResult.key,
          quotationResult.message,
          null,
          null,
          quotationResult.error,
        );
      }
       // Fetch the tenderId from the Quotation
       const quotationQuery = new TenderQuotationsGetQuery(req.body.quatationID);
       const quotationData = await this.queryBus.execute<
         TenderQuotationsGetQuery,
         AppResult<TenderQuotationsGetResult>
       >(quotationQuery);
 
       if (!quotationData.isSuccess || !quotationData.data) {
         return AppResponse.create<null>(
           false,
           quotationData.key,
           quotationData.message,
           null,
           null,
           quotationData.error,
         );
       }
 
      
 
       return AppResponse.create<null>(
        quotationData.isSuccess,
        quotationData.key,
        quotationData.message,
         null,
         null,
         quotationData.error,
       );
    }
    catch (error) {
      console.log(error)
      return AppResponse.create<null>(false, 'ERROR', 'Failed to accept tender', null, null, error);
    }
  }
  @Put('pay/Confirm')
  public async PayConfirm(
    @Query('id') id: string,
    @Req() req: any,
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;
    const tenderId = req.body.quatationID; // `quatationID` is actually the `tenderId`
  
    // Check if userId and tenderId are present
    if (!userId) {
      return AppResponse.create<null>(false, 'USER_ID_MISSING', 'User ID is missing', null, null, null);
    }
    if (!tenderId) {
      return AppResponse.create<null>(false, 'TENDER_ID_MISSING', 'Tender ID is missing', null, null, null);
    }
  
    try {
      // Fetch all quotations with the given tenderId and status "Payment"
      const quotationQuery = new TenderQuotationsGetAllQuery(
        null, // Page size, not needed for fetching all
        null, // Page number, not needed for fetching all
        false, // No pagination
        null, // No additional filters
        tenderId, // Filter by tenderId
        userId,   // Filter by userId if needed
      );
  
      const quotationData = await this.queryBus.execute<
        TenderQuotationsGetAllQuery,
        AppResult<Array<TenderQuotationsGetResult>>
      >(quotationQuery);
  
      if (!quotationData.isSuccess || !quotationData.data) {
        return AppResponse.create<null>(
          false,
          quotationData.key,
          quotationData.message,
          null,
          null,
          quotationData.error,
        );
      }
  
      // Filter quotations with status "Payment"
      const quotationsToUpdate = quotationData.data.filter(
        (quotation) => quotation.status === TenderStatusEnum.PAYMENT
      );
  
      // Update the status of each quotation to "PaymentConfirm"
      for (const quotation of quotationsToUpdate) {
        const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
          quotation.id,
          TenderStatusEnum.PAYMENTCONFIRM,
          userId,
        );
        const quotationResult = await this.commandBus.execute<
          TenderQuotationsUpdateStatusCommand,
          AppResult<null>
        >(updateQuotationCommand);
  
        if (!quotationResult.isSuccess) {
          console.log(`Failed to update quotation with ID: ${quotation.id}`);
          return AppResponse.create<null>(
            false,
            quotationResult.key,
            quotationResult.message,
            null,
            null,
            quotationResult.error,
          );
        }
      }
  
      // Once all quotations are updated, update the status of the tender
      const updateTenderCommand = new TendersUpdateStatusCommand(
        tenderId,
        TenderStatusEnum.PAYMENTCONFIRM,
        userId,
      );
      const tenderResult = await this.commandBus.execute<
        TendersUpdateStatusCommand,
        AppResult<null>
      >(updateTenderCommand);
  
      return AppResponse.create<null>(
        tenderResult.isSuccess,
        tenderResult.key,
        tenderResult.message,
        null,
        null,
        tenderResult.error,
      );
    } catch (error) {
      console.error('Error during PayConfirm:', error);
      return AppResponse.create<null>(
        false,
        'ERROR',
        'Failed to confirm payment and update tender status',
        null,
        null,
        error,
      );
    }
  }
}
 