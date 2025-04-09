import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { OrdersChangeStatusCommand } from "./orders-change-status.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { OrdersRepository } from "src/app/features/orders/persistence/repositories/orders.repository";
import { OrderFactory } from "../../../factories/order.factory";
import { OrdersGetResult } from "../../../results/orders/orders-get.result";
import { OrderStatusEnum } from "src/app/features/orders/domain/constants/enum/order-status-enum";
import { OrdersError } from "src/app/features/orders/domain/errors/orders-error";

@CommandHandler(OrdersChangeStatusCommand)
export class OrdersChangeStatusHandler
  implements ICommandHandler<OrdersChangeStatusCommand, AppResult<OrdersGetResult>> {
  public constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderFactory: OrderFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  public async execute(
    command: OrdersChangeStatusCommand,
  ): Promise<AppResult<OrdersGetResult>> {
    var foundOrderEntity =
      await this
        .ordersRepository
        .getById(
          command.id,
        );

    if (foundOrderEntity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'order',
            ),
        );
    }

    if (command.userId != foundOrderEntity.userId) {
      return AppResult
        .createError(
          AppErrors.notRelateToYourAccount(),
        );
    }

    if (command.status == OrderStatusEnum.ACCEPTED) {
      return AppResult
        .createError(
            OrdersError.acceptQuotationMustHasQuotationId(),
        );
    }

    let orderEntity =
      await this
        .orderFactory
        .save(
            foundOrderEntity._id,
            foundOrderEntity.title,
            foundOrderEntity.endDate,
            foundOrderEntity.deliverDate,
            foundOrderEntity.type,
            command.status,
            foundOrderEntity.region,
            foundOrderEntity.city,
            foundOrderEntity.address,
            foundOrderEntity.fileName,
            foundOrderEntity.fileDescription,
            foundOrderEntity.fileId,
            foundOrderEntity.attachmentName,
            foundOrderEntity.attachmentDescription,
            foundOrderEntity.attachmentId,
            foundOrderEntity.attachmentRequired,
            foundOrderEntity.attachmentDeliverDays,
            foundOrderEntity.contactInfo,
            foundOrderEntity.tenderId,
            foundOrderEntity.companyId,
            foundOrderEntity.userId,
            foundOrderEntity.products,            
            foundOrderEntity.Sendedproducts,            
            foundOrderEntity.OrderNr,            
            foundOrderEntity.DeliveryMethod,            
            foundOrderEntity.paymentMethod,            
            foundOrderEntity.invoices,            
        );

    orderEntity = this
      .eventPublisher
      .mergeObjectContext(
        orderEntity,
      );

    orderEntity
      .commit();

    const resultData =
      OrdersGetResult
        .create(
            orderEntity._id,
            orderEntity.title,
            orderEntity.endDate,
            orderEntity.deliverDate,
            orderEntity.type,
            orderEntity.status,
            orderEntity.region,
            orderEntity.city,
            orderEntity.address,
            orderEntity.fileName,
            orderEntity.fileDescription,
            orderEntity.fileId,
            orderEntity.attachmentName,
            orderEntity.attachmentDescription,
            orderEntity.attachmentId,
            orderEntity.attachmentRequired,
            orderEntity.attachmentDeliverDays,
            orderEntity.contactInfo,
            orderEntity.tenderId,
            orderEntity.companyId,
            orderEntity.userId,
            orderEntity.products,
            [],
            orderEntity.OrderNr,
            orderEntity.DeliveryMethod,
            orderEntity.paymentMethod,
            orderEntity.invoices,
        );

    return AppResult
      .createSuccess<OrdersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
