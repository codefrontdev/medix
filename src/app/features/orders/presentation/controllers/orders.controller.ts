/** @format */

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Get,
  Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/app/features/auth/application/guards/jwt-auth.guard";
import { RolesGuard } from "src/app/features/auth/application/guards/roles.guard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { OrdersGetResponse } from "../contracts/response/orders/orders-get.response";
import { OrdersGetAllResponse } from "../contracts/response/orders/orders-get-all.response";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { OrdersGetResult } from "../../applicatoin/results/orders/orders-get.result";
import { OrdersGetAllResult } from "../../applicatoin/results/orders/orders-get-all.result";
import { OrdersUpsertRequest } from "../contracts/request/orders/orders-upsert.request";
import { OrdersGetRequest } from "../contracts/request/orders/orders-get.request";
import { OrdersGetAllRequest } from "../contracts/request/orders/orders-get-all.request";
import { OrdersDeleteRequest } from "../contracts/request/orders/orders-delete.request";
import { OrdersGetQuery } from "../../applicatoin/queries/orders/get/orders-get.query";
import { OrdersGetAllQuery } from "../../applicatoin/queries/orders/getAll/orders-get-all.query";
import { OrdersUpsertCommand } from "../../applicatoin/commands/orders/upsert/orders-upsert.command";
import { OrdersDeleteCommand } from "../../applicatoin/commands/orders/delete/orders-delete.command";
import { OrdersChangeStatusCommand } from "../../applicatoin/commands/orders/change-status/orders-change-status.command";
import { OrdersChangeStatusRequest } from "../contracts/request/orders/orders-change-status.request";
import { AppResponse } from "src/app/@core/shared/presentation/contracts/response/app.response";
import { OrderStatusEnum } from "../../domain/constants/enum/order-status-enum";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";
import { TendersGetAllQuery } from "src/app/features/tenders/application/queries/tenders/getAll/tenders-get-all.query";
import { TendersGetAllResult } from "src/app/features/tenders/application/results/tenders/tenders-get-all.result";
import { CompaniesGetQuery } from "src/app/features/companies/application/queries/get/companies-get.query";
import { Company } from "src/app/features/companies/domain/entities/company";
import { OrdersGetAllBResponse } from "../contracts/response/orders/orders-buyer-all.response";
import { TendersGetQuery } from "src/app/features/tenders/application/queries/tenders/get/tenders-get.query";
import { TendersGetResult } from "src/app/features/tenders/application/results/tenders/tenders-get.result";
import { NotificationsRepository } from "src/app/features/notifications/persistence/repositories/notifications.repository";
import { NotificationFactory } from "src/app/features/notifications/application/factories/notification.factory";
import { UserCompaniesService } from "src/app/features/companies/application/services/user-companies.service";
import { UserService } from "src/app/features/users/user.service";
import { OrderTypeEnum } from "../../domain/constants/enum/order-type.enum";
import puppeteer from "puppeteer";
import * as fs from "fs";
import { CompanyService } from "src/app/features/companies/application/services/getCompanyById";
import { S3UploadService } from "src/app/@core/shared/application/services/s3-upload.service";
import { Tender } from "src/app/features/tenders/domain/entities/tender";

@Controller({
  path: "web/orders",
})
export class OrdersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly userCompaniesService: UserCompaniesService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("upsert")
  public async upsert(
    @Body() ordersUpsertRequest: OrdersUpsertRequest,
    @Req() req: any
  ): Promise<AppResponse<OrdersGetResponse>> {
    const { userId } = req.user;
    
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 30);

    const defaultDeliverDate = new Date();
    defaultDeliverDate.setDate(defaultDeliverDate.getDate() + 30);

    const mappedProducts = ordersUpsertRequest.products.map((product) => ({
      itemId: product.itemId || "", // Default to an empty string if undefined
      item: product.item,
      quantity: product.quantity,
      price: product.price,
      discount: product.discount,
      notice: product.notice || "",
      image: product.image,
      attachment: product.attachment,
      SKUCode: product.SKUCode,
      vat: product.vat,
      companyId: product.companyId || null,
      tender: product.tender || null,
      quatationId: product.quatationId || null,
    }));
    const mappedSendedproducts =
      ordersUpsertRequest.Sendedproducts ?
        ordersUpsertRequest.Sendedproducts.map((product) => ({
          itemId: product.itemId || "", // Default to an empty string if undefined
          item: product.item,
          quantity: product.quantity,
          price: product.price,
          discount: product.discount,
          notice: product.notice || "",
          image: product.image,
          attachment: product.attachment,
          SKUCode: product.SKUCode,
          vat: product.vat,
          companyId: product.companyId || null,
          tender: product.tender || null,
          quatationId: product.quatationId || null,
        }))
      : [];
    //

    //
    let invoices = ordersUpsertRequest.invoices || [];
    let Status = ordersUpsertRequest.status;
    if (req.user.roles.includes("Seller")) {
      if (
        mappedSendedproducts.length > 0 &&
        mappedSendedproducts.length === mappedProducts.length
      ) {
        Status = OrderStatusEnum.SENDING;
        const englishPDF = await this.createAndUploadPDF(
          ordersUpsertRequest,
          "en"
        );
        const arabicPDF = await this.createAndUploadPDF(
          ordersUpsertRequest,
          "ar"
        );
        invoices.push({
          fileName: `invoice_${ordersUpsertRequest.OrderNr}`,
          companyId: mappedSendedproducts[0].companyId || null,
          createdDate: new Date(),
          userId: userId,
          enVersion: englishPDF,
          arVersion: arabicPDF,
        });
      }
      if (
        mappedSendedproducts.length > 0 &&
        mappedSendedproducts.length < mappedProducts.length
      ) {
        Status = OrderStatusEnum.PARTSENDING;
        const englishPDF = await this.createAndUploadPDF(
          ordersUpsertRequest,
          "en"
        );
        const arabicPDF = await this.createAndUploadPDF(
          ordersUpsertRequest,
          "ar"
        );
        invoices.push({
          fileName: `invoice_${ordersUpsertRequest.OrderNr}`,
          companyId: mappedSendedproducts[0].companyId || null,
          createdDate: new Date(),
          userId: userId,
          enVersion: englishPDF,
          arVersion: arabicPDF,
        });
      }
    }
    if (req.user.roles.includes("Buyer")) {
      if (
        mappedSendedproducts.length > 0 &&
        mappedSendedproducts.length === mappedProducts.length
      ) {
        Status = OrderStatusEnum.FINISHED;
      }
      if (
        mappedSendedproducts.length > 0 &&
        mappedSendedproducts.length < mappedProducts.length &&
        ordersUpsertRequest.status === OrderStatusEnum.PARTSENDING
      ) {
        Status = OrderStatusEnum.PARTRECEIVING;
      }
    }
    
    
    const command = new OrdersUpsertCommand(
      ordersUpsertRequest.id ? ordersUpsertRequest.id : null,
      ordersUpsertRequest.title,
      ordersUpsertRequest.endDate || defaultEndDate,
      ordersUpsertRequest.deliverDate || defaultDeliverDate,
      ordersUpsertRequest.type || OrderTypeEnum.TINY,
      Status,
      ordersUpsertRequest.region,
      ordersUpsertRequest.city,
      ordersUpsertRequest.address,
      ordersUpsertRequest.fileName,
      ordersUpsertRequest.fileDescription,
      ordersUpsertRequest.fileId,
      ordersUpsertRequest.attachmentName,
      ordersUpsertRequest.attachmentDescription,
      ordersUpsertRequest.attachmentId,
      ordersUpsertRequest.attachmentRequired ?? false,
      ordersUpsertRequest.attachmentDeliverDays,
      ordersUpsertRequest.contactInfo,
      ordersUpsertRequest.tenderId ? ordersUpsertRequest.tenderId : null,
      ordersUpsertRequest.companyId ? ordersUpsertRequest.companyId : null,
      userId,
      mappedProducts,
      mappedSendedproducts,
      ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0,
      ordersUpsertRequest.DeliveryMethod,
      ordersUpsertRequest.paymentMethod,
      invoices
    );
    
    const result = await this.commandBus.execute<
      OrdersUpsertCommand,
      AppResult<OrdersGetResult>
    >(command);

    if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Planning") {
      const factory = new NotificationFactory(this.notificationsRepository);
      await factory.save(
        null, // No ID for new notification
        userId, // Notification for the current user
        "INFO", // Notification type
        `تم تحديث طلبك برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, // Custom message in Arabic
        false, // Not read
        new Date() // Current timestamp
      );
    }

    if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Opened") {
      const factory = new NotificationFactory(this.notificationsRepository);
      mappedProducts.map(async (item) => {
        const users = await this.userCompaniesService.getAllUsersByCompanyId(
          item.companyId
        );

        await factory.save(
          null, // No ID for new notification
          users ? users[0].id : null, // Notification for the current user
          "INFO", // Notification type
          `${users ? users[0].nickName : null} ارسال الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, // Custom message in Arabic
          false, // Not read
          new Date() // Current timestamp
        );
      });
    }
    if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Accepted") {
      const factory = new NotificationFactory(this.notificationsRepository);
      const users = await this.userService.findById(userId);

      await factory.save(
        null, // No ID for new notification
        ordersUpsertRequest.userId, // Notification for the current user
        "INFO", // Notification type
        `${users?.nickName} قبول الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, // Custom message in Arabic
        false, // Not read
        new Date() // Current timestamp
      );
    }
    if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Sending") {
      const factory = new NotificationFactory(this.notificationsRepository);
      const users = await this.userService.findById(userId);

      await factory.save(
        null, // No ID for new notification
        ordersUpsertRequest.userId, // Notification for the current user
        "INFO", // Notification type
        `${users?.nickName} شحن الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, // Custom message in Arabic
        false, // Not read
        new Date() // Current timestamp
      );
    }
    if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Canceled") {
      const factory = new NotificationFactory(this.notificationsRepository);
      const users = await this.userService.findById(userId);
      
      await factory.save(
        null, // No ID for new notification
        ordersUpsertRequest.userId, // Notification for the current user
        "INFO", // Notification type
        `${users?.nickName} رفض الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, // Custom message in Arabic
        false, // Not read
        new Date() // Current timestamp
      );
    }

    return AppResponse.create<OrdersGetResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,

      null,
      result.error
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("changeStatus")
  public async changeStatus(
    @Body() ordersChangeStatusRequest: OrdersChangeStatusRequest,
    @Req() req: any
  ): Promise<AppResponse<OrdersGetResponse>> {
    const { userId } = req.user;

    const command = new OrdersChangeStatusCommand(
      ordersChangeStatusRequest.id,
      ordersChangeStatusRequest.status,
      ordersChangeStatusRequest.tenderQuotationId,
      ordersChangeStatusRequest.orderId,
      userId
    );

    const result = await this.commandBus.execute<
      OrdersChangeStatusCommand,
      AppResult<OrdersGetResult>
    >(command);

    return AppResponse.create<OrdersGetResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,

      null,
      result.error
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  public async delete(
    @Query() ordersDeleteRequest: OrdersDeleteRequest,
    @Req() req: any
  ): Promise<AppResponse<null>> {
    const { userId } = req.user;

    const command = new OrdersDeleteCommand(ordersDeleteRequest.id, userId);

    const result = await this.commandBus.execute<
      OrdersDeleteCommand,
      AppResult<null>
    >(command);

    return AppResponse.create<null>(
      result.isSuccess,
      result.key,
      result.message,
      null,
      null,
      result.error
    );
  }

  @Get("get")
  public async get(
    @Query() ordersGetRequest: OrdersGetRequest
  ): Promise<AppResponse<OrdersGetResponse>> {
    try {
      // Step 1: Fetch Order Details
      const orderQuery = new OrdersGetQuery(ordersGetRequest.id);
      const orderResult = await this.queryBus.execute<
        OrdersGetQuery,
        AppResult<OrdersGetResult>
      >(orderQuery);

      if (!orderResult.isSuccess) {
        return AppResponse.create<OrdersGetResponse>(
          false,
          orderResult.key,
          orderResult.message,
          null,
          null,
          orderResult.error
        );
      }

      let orderData = orderResult.data;

      // Step 2: Fetch Tender Details
      const tenderQuery = new TendersGetQuery(orderData.tenderId);
      const tenderResult = await this.queryBus.execute<
        TendersGetQuery,
        AppResult<TendersGetResult>
      >(tenderQuery);

      if (tenderResult.isSuccess) {
        orderData = {
          ...orderData,
          Tender: tenderResult.data as TendersGetResult,
        };
        const BuycompanyQuery = new CompaniesGetQuery(
          tenderResult.data.companyId
        );
        const BuycompanyResult = await this.queryBus.execute<
          CompaniesGetQuery,
          AppResult<Company>
        >(BuycompanyQuery);
        orderData = { ...orderData, Buycompany: BuycompanyResult.data };
      }

      // Step 3: Fetch Company Details
      const companyQuery = new CompaniesGetQuery(orderData.companyId);
      const companyResult = await this.queryBus.execute<
        CompaniesGetQuery,
        AppResult<Company>
      >(companyQuery);

      orderData = {
        ...orderData,
        company: companyResult.isSuccess ? companyResult.data : null,
      };
      // Step 4: Fetch Product Companies
      const productCompanyPromises = orderData.products.map(async (product) => {
        const productCompanyQuery = new CompaniesGetQuery(product.companyId);
        const productCompanyResult = await this.queryBus.execute<
          CompaniesGetQuery,
          AppResult<Company>
        >(productCompanyQuery);
        return {
          ...product,
          company:
            productCompanyResult.isSuccess ? productCompanyResult.data : null,
        };
      });

      const updatedProducts = await Promise.all(productCompanyPromises);
      orderData = { ...orderData, products: updatedProducts };
      // Step 4: Fetch Product Companies
      const SendedproductsCompanyPromises = orderData.Sendedproducts.map(
        async (product) => {
          const SendedproductsCompanyQuery = new CompaniesGetQuery(
            product.companyId
          );
          const SendedproductsCompanyResult = await this.queryBus.execute<
            CompaniesGetQuery,
            AppResult<Company>
          >(SendedproductsCompanyQuery);
          return {
            ...product,
            company:
              SendedproductsCompanyResult.isSuccess ?
                SendedproductsCompanyResult.data
              : null,
          };
        }
      );

      const updatedSendedproducts = await Promise.all(
        SendedproductsCompanyPromises
      );
      orderData = { ...orderData, Sendedproducts: updatedSendedproducts };

      // Step 4: Return Combined Response
      return AppResponse.create<OrdersGetResponse>(
        true,
        orderResult.key,
        "Order retrieved successfully",
        orderData,
        null,
        null
      );
    } catch (error) {
      // Handle Unexpected Errors
      return AppResponse.create<OrdersGetResponse>(
        false,
        "error.unexpected",
        "An unexpected error occurred",
        null,
        null,
        error
      );
    }
  }

  @Get("getAll")
  public async getAll(
    @Query() ordersGetAllRequest: OrdersGetAllRequest,
    @Req() req: any
  ): Promise<AppResponse<Array<OrdersGetAllResponse>>> {
    const { userId } = req.user || {};
    const role = userId?.role;

    const query = new OrdersGetAllQuery(
      ordersGetAllRequest.pageSize,
      ordersGetAllRequest.pageNumber,
      ordersGetAllRequest.withPaging,
      ordersGetAllRequest.search,
      ordersGetAllRequest.type,
      ordersGetAllRequest.status,
      ordersGetAllRequest.TenderId,
      ordersGetAllRequest.companyId,
      null,
      OrderStatusEnum.PLANING
    );
    const result = await this.queryBus.execute<
      OrdersGetAllQuery,
      AppResult<Array<OrdersGetAllResult>>
    >(query);
    let responseData =
      result.data ?
        result.data.map((order) => {
          // Filter products if the role is Seller
          const filteredProducts =
            role === "Seller" && ordersGetAllRequest.companyId ?
              order.products.filter(
                (product) => product.companyId === ordersGetAllRequest.companyId
              )
            : order.products;

          return OrdersGetAllResponse.create(
            order.id,
            order.title,
            order.endDate,
            order.deliverDate,
            order.type,
            order.status,
            order.region,
            order.city,
            order.address,
            order.attachmentRequired,
            order.tenderId,
            order.companyId,
            order.userId,
            filteredProducts, // Use filtered products
            order.Sendedproducts,
            order.OrderNr,
            order.DeliveryMethod,
            order.paymentMethod,
            order.invoices,
            order.tender
          );
        })
      : [];

    return AppResponse.create<Array<OrdersGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error
    );
  }
  @Get("getAllBuyer")
  public async getAllBuyer(
    @Query() ordersGetAllRequest: OrdersGetAllRequest,
    @Req() req: any
  ): Promise<AppResponse<Array<OrdersGetAllResponse>>> {
    const { userId } = req.user || {};
    
    const tendersResult = await this.queryBus.execute<
      TendersGetAllQuery,
      AppResult<Array<TendersGetAllResult>>
    >(
      new TendersGetAllQuery(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        ordersGetAllRequest.companyId,
        null
      )
    );
    if (!tendersResult.isSuccess || !tendersResult.data) {
      return AppResponse.create<Array<OrdersGetAllResponse>>(
        false,
        tendersResult.key,
        tendersResult.message,
        [],
        null,
        tendersResult.error
      );
    }
    if (tendersResult.data.length === 0) {
      return AppResponse.create<Array<OrdersGetAllResponse>>(
        true,
        tendersResult.key,
        tendersResult.message,
        [],
        null,
        tendersResult.error
      );
    }
    const tenderIds = tendersResult.data.map((tender) => tender.id);
    
    const filterQuery = new OrdersGetAllQuery(
      null,
      null,
      null,
      null,
      null,
      null,
      tenderIds, // Use tender IDs as a filter
      null,
      null // User ID is not needed
    );

    const ordersResult = await this.queryBus.execute<
      OrdersGetAllQuery,
      AppResult<Array<OrdersGetAllResult>>
    >(filterQuery);

    if (!ordersResult.isSuccess || !ordersResult.data) {
      return AppResponse.create<Array<OrdersGetAllResponse>>(
        false,
        ordersResult.key,
        ordersResult.message,
        [],
        null,
        ordersResult.error
      );
    }
    const enrichedOrders = await Promise.all(
      ordersResult.data.map(async (order) => {
        // Fetch company details
        const companyResult = await this.queryBus.execute<
          CompaniesGetQuery,
          AppResult<Company>
        >(new CompaniesGetQuery(order.companyId));

        return OrdersGetAllBResponse.create(
          order.id,
          order.title,
          order.endDate,
          order.deliverDate,
          order.type,
          order.status,
          order.region,
          order.city,
          order.address,
          order.attachmentRequired,
          order.tenderId,
          order.companyId,
          order.userId,
          order.products,
          order.Sendedproducts,
          order.OrderNr,
          order.DeliveryMethod,
          order.paymentMethod,
          order.invoices,
          order.tender,
          companyResult.isSuccess ? companyResult.data : null // Attach company details
        );
      })
    );

    return AppResponse.create<Array<OrdersGetAllResponse>>(
      ordersResult.isSuccess,
      ordersResult.key,
      ordersResult.message,
      enrichedOrders,
      ordersResult.paging,
      ordersResult.error
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("getMy")
  public async getMyAll(
    @Query() OrdersGetAllRequest: OrdersGetAllRequest,
    @Req() req: any
  ): Promise<AppResponse<Array<OrdersGetAllResponse>>> {
    const { userId } = req.user || {};

    const query = new OrdersGetAllQuery(
      OrdersGetAllRequest.pageSize,
      OrdersGetAllRequest.pageNumber,
      OrdersGetAllRequest.withPaging,
      OrdersGetAllRequest.search,
      OrdersGetAllRequest.type,
      OrdersGetAllRequest.status,
      OrdersGetAllRequest.TenderId,
      OrdersGetAllRequest.companyId,
      userId
    );

    const result = await this.queryBus.execute<
      OrdersGetAllQuery,
      AppResult<Array<OrdersGetAllResult>>
    >(query);
    const responseData =
      result.data ?
        result.data
          .filter((item) => item.userId === userId)
          .map((order) =>
            OrdersGetAllResponse.create(
              order.id,
              order.title,
              order.endDate,
              order.deliverDate,
              order.type,
              order.status,
              order.region,
              order.city,
              order.address,
              order.attachmentRequired,
              order.companyId,
              order.userId
            )
          )
      : [];

    return AppResponse.create<Array<OrdersGetAllResponse>>(
      result.isSuccess,
      result.key,
      result.message,
      responseData,
      result.paging,
      result.error
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get("getTotal/Closed")
  public async getAllTotal(@Req() req: any): Promise<{ total: number }> {
    const { userId } = req.user;
    const status = OrderStatusEnum.CLOSED;

    const query = new OrdersGetAllQuery(
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
    const openedOrders = await this.queryBus.execute<
      OrdersGetAllQuery,
      AppResult<Array<OrdersGetAllResult>>
    >(query);
    return { total: openedOrders.data ? openedOrders.data.length : 0 };
  }
  //data
  @UseGuards(JwtAuthGuard)
  @Get("getTotal/ByStatus")
  public async getAllTotalByStatus(
    @Req() req: any
  ): Promise<{ total: number; status: string }[]> {
    const { userId } = req.user;
    const query = new OrdersGetAllQuery(
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
    const Orders = await this.queryBus.execute<
      OrdersGetAllQuery,
      AppResult<Array<OrdersGetAllResult>>
    >(query);
    // Create a map to count tenders by status
    const statusCountMap: { [key: string]: number } = {};

    if (Orders.data.filter((item) => item.userId === userId)) {
      Orders.data
        .filter((item) => item.userId === userId)
        .forEach((order) => {
          const status = order.status;
          if (statusCountMap[status]) {
            statusCountMap[status]++;
          } else {
            statusCountMap[status] = 1;
          }
        });
    }
    // Convert the status count map to an array of objects
    const result = Object.entries(statusCountMap).map(([status, total]) => ({
      status,
      total,
    }));

    return result;
  }
  private async createPDFInvoice(
    order,
    company,
    lang: "en" | "ar"
  ): Promise<string> {
    const isArabic = lang === "ar";
    const alignment = isArabic ? "right" : "left";
    const direction = isArabic ? "rtl" : "ltr";
    const companyName = company ? company.nameAr : "N/A";

    // Get Created Date
    const createdDate = new Date(order.endDate).toLocaleDateString(
      lang === "ar" ? "ar-SA" : "en-US"
    );

    const htmlContent = `
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Arial', sans-serif; direction: ${direction}; text-align: ${alignment}; margin: 40px; }
          h1, h3 { text-align: center; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: ${alignment}; }
          th { background-color: #f2f2f2; }
          .footer { margin-top: 30px; font-size: 14px; text-align: center; }
          img { width: 50px; height: 50px; }
        </style>
      </head>
      <body>
        <h1>${isArabic ? "فاتورة" : "Invoice"}</h1>
        
        <div class="invoice-details">
          <p><strong>${isArabic ? "رقم الطلب:" : "Order Number:"}</strong> ${order.OrderNr}</p>
          <p><strong>${isArabic ? "تاريخ الإنشاء:" : "Created Date:"}</strong> ${createdDate}</p>
          <p><strong>${isArabic ? "عنوان التسليم:" : "Delivery Address:"}</strong> ${order.address}</p>
          <p><strong>${isArabic ? "شركة:" : "Company:"}</strong> ${companyName}</p>
          <p><strong>${isArabic ? "طريقة التوصيل:" : "Delivery Method:"}</strong> ${order.DeliveryMethod}</p>
        </div>
  
        <table>
          <thead>
            <tr>
              <th>${isArabic ? "الصورة" : "Image"}</th>
              <th>${isArabic ? "SKU" : "SKU Code"}</th>
              <th>${isArabic ? "البند" : "Item"}</th>
              <th>${isArabic ? "الكمية" : "Quantity"}</th>
              <th>${isArabic ? "السعر" : "Price (SAR)"}</th>
              <th>${isArabic ? "ضريبة القيمة المضافة" : "VAT (%)"}</th>
            </tr>
          </thead>
          <tbody>
            ${order.Sendedproducts.map(
              (product) => `
              <tr>
                <td><img src="${product.image || "https://via.placeholder.com/50"}" /></td>
                <td>${product.SKUCode}</td>
                <td>${product.item}</td>
                <td>${product.quantity}</td>
                <td>${product.price.toFixed(2)} SAR</td>
                <td>${product.vat}%</td>
              </tr>
            `
            ).join("")}
          </tbody>
        </table>
  
        <p class="footer">${isArabic ? "شكراً لتعاملكم معنا!" : "Thank you for your business!"}</p>
      </body>
      </html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const filePath = `./invoice_${order.OrderNr}_${lang}.pdf`;
    await page.pdf({ path: filePath, format: "A4", printBackground: true });

    await browser.close();
    return filePath;
  }
  private async createAndUploadPDF(order, lang: "en" | "ar"): Promise<string> {
    // Get Company Name
    const company = await this.companyService.getCompanyById(order.companyId);

    const pdfPath = await this.createPDFInvoice(order, company, lang);

    // Convert PDF to Buffer for S3 Upload
    const fileBuffer = fs.readFileSync(pdfPath);
    const file = {
      buffer: fileBuffer,
      originalname: `${order.OrderNr}_${lang}.pdf`,
      mimetype: "application/pdf",
    };

    const folderPath = `${company.registrationNumber}/orders/${order.OrderNr}`;
    const s3Url = await S3UploadService.uploadFile(
      file as Express.Multer.File,
      folderPath
    );

    // Delete Local File After Upload
    fs.unlinkSync(pdfPath);

    return s3Url;
  }
}
