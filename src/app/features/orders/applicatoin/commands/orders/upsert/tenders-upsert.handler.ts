import { CommandBus, CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { OrdersUpsertCommand } from "./orders-upsert.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { OrdersRepository } from "src/app/features/orders/persistence/repositories/orders.repository";
import { OrderFactory } from "../../../factories/order.factory";
import { OrdersGetResult } from "../../../results/orders/orders-get.result";
import { CompaniesRepository } from "src/app/features/companies/persistence/repositories/companies.repository";
import { TenderQuotationsUpdateStatusCommand } from "src/app/features/tenders/application/queries/tender-quotations/update/tenders-quatation-update-status-query";
import { TenderStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-status.enum";

@CommandHandler(OrdersUpsertCommand)
export class OrdersUpsertHandler
  implements ICommandHandler<OrdersUpsertCommand, AppResult<OrdersGetResult>> {
  public constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderFactory: OrderFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly companiesRepository: CompaniesRepository,
    private readonly commandBus: CommandBus
  ) { }

  public async execute(
    command: OrdersUpsertCommand,
  ): Promise<AppResult<OrdersGetResult>> {
    const isInsert = command.id === null;

    let orderNr: number | null = command.OrderNr;
    if (!isInsert) {
      var foundEntity =
        await this
          .ordersRepository
          .getById(
            command.id,
          );

      if (foundEntity === null) {
        return AppResult
          .createError(
            AppErrors
              .nullValue(
                'tender',
              ),
          );
      }

      /*if (command.userId != foundEntity.userId) {
        return AppResult
          .createError(
            AppErrors.notRelateToYourAccount(),
          );
      }*/
    }else{
      //await this.companiesRepository.updateOrderNr(command.companyId, command.OrderNr);
      const lastOrder = await this.ordersRepository.getLatestOrder();
      const nextOrderNr = lastOrder ? lastOrder.OrderNr >= 1000? lastOrder.OrderNr + 1 :1000 : 1000;
      orderNr = nextOrderNr;
      
      if(command.products.length > 0){
        command.products.map(async (product) => {
          const updateQuotationCommand = new TenderQuotationsUpdateStatusCommand(
            product.quatationId,
            TenderStatusEnum.ACCEPTED,
            command.userId,
            );
            await this.commandBus.execute<
            TenderQuotationsUpdateStatusCommand,
            AppResult<null>
            >(updateQuotationCommand);
            });
      }     
    }
    
    let entity =
      await this
        .orderFactory
        .save(
          command.id,
          command.title,
          command.endDate,
          command.deliverDate,
          command.type,
          command.status,
          command.region,
          command.city,
          command.address,
          command.fileName,
          command.fileDescription,
          command.fileId,
          command.attachmentName,
          command.attachmentDescription,
          command.attachmentId,
          command.attachmentRequired,
          command.attachmentDeliverDays,
          command.contactInfo,
          command.tenderId,
          command.companyId,
          command.userId,
          command.products,
          command.Sendedproducts,
          orderNr,
          command.DeliveryMethod,
          command.paymentMethod,
          command.invoices,
        );

    entity = this
      .eventPublisher
      .mergeObjectContext(
        entity,
      );

    entity
      .commit();

    const resultData =
      OrdersGetResult
        .create(
          entity._id,
          entity.title,
          entity.endDate,
          entity.deliverDate,
          entity.type,
          entity.status,
          entity.region,
          entity.city,
          entity.address,
          entity.fileName,
          entity.fileDescription,
          entity.fileId,
          entity.attachmentName,
          entity.attachmentDescription,
          entity.attachmentId,
          entity.attachmentRequired,
          entity.attachmentDeliverDays,
          entity.contactInfo,
          entity.tenderId,
          entity.companyId,
          entity.userId,
          entity.products || [],
          entity.Sendedproducts || [],
          entity.OrderNr,
          entity.DeliveryMethod,
          entity.paymentMethod,
          entity.invoices || [],
        );

    return AppResult
      .createSuccess<OrdersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
