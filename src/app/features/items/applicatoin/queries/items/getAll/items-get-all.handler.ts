import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FilterQuery } from 'mongoose';
import { Item } from '../../../../domain/entities/item';
import { ItemsGetAllQuery } from './items-get-all.query';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { ItemsGetAllResult } from '../../../results/items/items-get-all.result';
import { ItemsRepository } from '../../../../persistence/repositories/items.repository';
import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';

@QueryHandler(ItemsGetAllQuery)
export class ItemsGetAllHandler
  implements IQueryHandler<ItemsGetAllQuery, AppResult<Array<ItemsGetAllResult>>> {

  public constructor(
    private readonly itemsRepository: ItemsRepository,
  ) {}

  public async execute(
    query: ItemsGetAllQuery,
  ): Promise<AppResult<Array<ItemsGetAllResult>>> {
    const filter: FilterQuery<Item> = {};

    // Apply search filter
    if (query.search !== null) {
      filter.$or = [
        {
          name: searchRegEx(query.search),
        },
        {
          description: searchRegEx(query.search),
        },
      ];
    }

    // Apply type filter
    if (query.type !== null) {
      filter.type = query.type;
    }

    // Apply status filter
    if (query.status !== null) {
      filter.status = query.status;
    }

    // Apply company filter
    if (query.companyId !== null) {
      filter.companyId = createObjectId(query.companyId);
    }

    // Apply user filter
    if (query.userId !== null) {
      filter.userId = createObjectId(query.userId);
    }

    // Fetch items with filters and pagination
    const result = await this.itemsRepository.getAllAsResult(
      filter,
      {}, // Additional query options
      [], // Populate fields
      query.pageSize,
      query.pageNumber,
      query.withPaging,
      [
        {
          field: OrderByEnum.CREATED_AT,
          direction: OrderDirectionEnum.DESC,
        },
        {
          field: OrderByEnum.NAME,
          direction: OrderDirectionEnum.ASC,
        },
      ],
    );

    // Map entities to result objects
    const entitiesResults = result.data.map((element) =>
      ItemsGetAllResult.create(
        element._id,
        element.name,
        element.SKUCode,
        element.manufacturer,
        element.brand,
        element.model,
        element.unit,
        element.categories,
        element.description,
        element.price,
        element.vat,
        element.stock,
        element.tags,
        element.image,
        element.status,
        element.type,
        element.companyId,
        element.userId,
        element.ItemNR,
      ),
    );

    // Return results with pagination
    return AppResult.createSuccess<Array<ItemsGetAllResult>>(
      null,
      null,
      entitiesResults,
      result.paging,
    );
  }
}
