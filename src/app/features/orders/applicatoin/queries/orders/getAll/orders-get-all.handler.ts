import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FilterQuery } from 'mongoose';
import { Order } from '../../../../domain/entities/order';
import { OrdersGetAllQuery } from './orders-get-all.query';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { OrdersGetAllResult } from '../../../results/orders/orders-get-all.result';
import { OrdersRepository } from '../../../../persistence/repositories/orders.repository';

import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';
import { TendersRepository } from 'src/app/features/tenders/persistence/repositories/tenders.repository';

@QueryHandler(OrdersGetAllQuery)
export class OrdersGetAllHandler
  implements IQueryHandler<OrdersGetAllQuery, AppResult<Array<OrdersGetAllResult>>> {

  public constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly tendersRepository: TendersRepository, // Inject Tenders Repository
  ) { }

  public async execute(
    query: OrdersGetAllQuery,
  ): Promise<AppResult<Array<OrdersGetAllResult>>> {
    const filter: FilterQuery<Order> = {};

      // Apply search filter
      if (query.search) {
        filter.$or = [
          {
            title: searchRegEx(query.search),
          },
        ];
      }

      // Apply other filters
      if (query.type) {
        filter.type = query.type;
      }

      if (query.status) {
        filter.status = query.status;
      }

      if (query.companyId) {
        filter.$or = [
          { companyId: createObjectId(query.companyId) },
          { "products.companyId": createObjectId(query.companyId) },
        ];
      }

      if (query.userId) {
        filter.userId = createObjectId(query.userId);
      }
// Apply TenderId filter
if (query.TenderId && query.TenderId.length > 0) {
  filter.tenderId = { $in: query.TenderId.map((id) => createObjectId(id)) };
}

if (query.statusExclusion) {
  filter.status = { $ne: query.statusExclusion };
}
      // Fetch orders with pagination and sorting
      const result = await this.ordersRepository.getAllAsResult(
        filter,
        {}, // Projection
        [], // Population options
        query.pageSize || 10, // Default pageSize
        query.pageNumber || 1, // Default pageNumber
        query.withPaging || true,
        [
          {
            field: OrderByEnum.CREATED_AT,
            direction: OrderDirectionEnum.DESC,
          },
          {
            field: OrderByEnum.TITLE,
            direction: OrderDirectionEnum.ASC,
          },
        ],
      );

      // Map entities to results and include Tender entity
      const entitiesResults = await Promise.all(
        result.data.map(async (element) => {
          const tender = element.tenderId
            ? await this.tendersRepository.getById(element.tenderId) // Fetch the Tender entity
            : null;

          return OrdersGetAllResult.create(
            element._id,
            element.title,
            element.endDate,
            element.deliverDate,
            element.type,
            element.status,
            element.region,
            element.city,
            element.address,
            element.attachmentRequired,
            element.tenderId,
            element.companyId,
            element.userId,
            element.products,
            element.Sendedproducts,
            element.OrderNr,
            element.DeliveryMethod,
            element.paymentMethod,
            element.invoices,
            tender, // Pass the tender entity here
          );
        }),
      );

      return AppResult.createSuccess<Array<OrdersGetAllResult>>(
        null,
        null,
        entitiesResults,
        result.paging,
      );
    }
}
