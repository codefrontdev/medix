import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FilterQuery } from 'mongoose';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';


import { TransformsGetAllResult } from '../../../results/items/transforms-get-all.result';
import { TransformsGetAllQuery } from './stransforms-get-all.query';
import { TransformsRepository } from 'src/app/features/transformation/persistence/repositories/stransforms.repository';



@QueryHandler(TransformsGetAllQuery)
export class TransformsGetAllHandler
  implements IQueryHandler<TransformsGetAllQuery, AppResult<Array<TransformsGetAllResult>>> {
  
  public constructor(
    private readonly transformsRepository: TransformsRepository,
  ) {}

  public async execute(
    query: TransformsGetAllQuery,
  ): Promise<AppResult<Array<TransformsGetAllResult>>> {
    const filter: FilterQuery<any> = {};

    // Apply search filter
    if (query.search !== null) {
      filter.$or = [
        { title: searchRegEx(query.search) },
        { description: searchRegEx(query.search) },
      ];
    }

    // Apply status filter
    if (query.status !== null) {
      filter.status = query.status;
    }

    // Apply buyer filter
    if (query.buyerId !== null) {
      filter.buyerId = createObjectId(query.buyerId);
    }

    // Apply seller filter
    if (query.sellerId !== null) {
      filter.sellerId = createObjectId(query.sellerId);
    }

    // Apply user filter
    if (query.userId !== null) {
      filter.userId = createObjectId(query.userId);
    }

    // Apply date range filter
   

    // Fetch transforms with filters and pagination
    const result = await this.transformsRepository.getAllAsResult(
      filter,
      {}, // Additional query options
      [], // Populate fields
      query.pageSize,
      query.pageNumber,
      query.withPaging,
     
    );

    // Map entities to result objects
    const entitiesResults = result.data.map((element) =>
      TransformsGetAllResult.create(
        element._id,
        element.title,
        element.status,
        element.buyerId,
        element.sellerId,
        element.userId,
        element.orderId,
        element.type,
        element.products,
        element.totalPrice,
        element.transformRequest,
        element.transformDoc || [],
        element.withdrawRequest,
        element.bankAccount || [],
        element.createdAt,
        element.updatedAt,
      ),
    );

    // Return results with pagination
    return AppResult.createSuccess<Array<TransformsGetAllResult>>(
      null,
      null,
      entitiesResults,
      result.paging,
    );
  }
}
