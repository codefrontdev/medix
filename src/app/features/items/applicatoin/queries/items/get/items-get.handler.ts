import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { AppErrors } from 'src/app/@core/shared/domain/errors/app-errors';
import { ItemsGetQuery } from './items-get.query';
import { ItemsGetResult } from '../../../results/items/items-get.result';
import { ItemsRepository } from '../../../../persistence/repositories/items.repository';

@QueryHandler(ItemsGetQuery)
export class ItemsGetHandler
  implements ICommandHandler<ItemsGetQuery, AppResult<ItemsGetResult>> {

  public constructor(
    private readonly itemsRepository: ItemsRepository,
  ) {}

  public async execute(
    query: ItemsGetQuery,
  ): Promise<AppResult<ItemsGetResult>> {
    // Fetch the item by ID
    const entity = await this.itemsRepository.getById(query.id, {});

    // Check if the item exists
    if (entity === null) {
      return AppResult.createError(
        AppErrors.nullValue('item'),
      );
    }

    // Create a result object from the entity
    const resultData = ItemsGetResult.create(
      entity._id,
      entity.name,
      entity.SKUCode,
      entity.manufacturer,
      entity.brand,
      entity.model,
      entity.unit,
      entity.categories,
      entity.description,
      entity.price,
      entity.vat,
      entity.stock,
      entity.tags,
      entity.image,
      entity.attachments || [],
      entity.status,
      entity.type,
      entity.companyId,
      entity.userId,
      entity.ItemNR,
    );

    // Return a successful result
    return AppResult.createSuccess<ItemsGetResult>(
      null,
      null,
      resultData,
    );
  }
}
