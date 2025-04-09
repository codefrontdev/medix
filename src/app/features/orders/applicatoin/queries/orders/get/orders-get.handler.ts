import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { AppErrors } from 'src/app/@core/shared/domain/errors/app-errors';
import { OrdersGetQuery } from './orders-get.query';
import { OrdersGetResult } from '../../../results/orders/orders-get.result';
import { OrdersRepository } from '../../../../persistence/repositories/orders.repository';

@QueryHandler(OrdersGetQuery)
export class OrdersGetHandler
  implements ICommandHandler<OrdersGetQuery, AppResult<OrdersGetResult>> {

  public constructor(
    private readonly ordersRepository: OrdersRepository,
  ) { }

  public async execute(
    query: OrdersGetQuery,
  ): Promise<AppResult<OrdersGetResult>> {
    const entity =
      await this
        .ordersRepository
        .getById(
          query.id,
          {}
        );

    if (entity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'object',
            ),
        );
    }

    const resultData =
    OrdersGetResult.create(
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
        entity.products,
        entity.Sendedproducts,
        entity.OrderNr,
        entity.DeliveryMethod,
        entity.paymentMethod,
        entity.invoices,
      );

    return AppResult
      .createSuccess<OrdersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
