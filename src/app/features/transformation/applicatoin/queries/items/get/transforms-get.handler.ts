import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { AppErrors } from 'src/app/@core/shared/domain/errors/app-errors';
import { TransfromsGetQuery } from './transforms-get.query';
import { TransformsGetResult } from '../../../results/items/transforms-get.result';
import { TransformsRepository } from 'src/app/features/transformation/persistence/repositories/stransforms.repository';

@QueryHandler(TransfromsGetQuery)
export class TransformsGetHandler
  implements ICommandHandler<TransfromsGetQuery, AppResult<TransformsGetResult>> {

  public constructor(
    private readonly transformsRepository: TransformsRepository,
  ) {}

  public async execute(
    query: TransfromsGetQuery,
  ): Promise<AppResult<TransformsGetResult>> {
    // Fetch the transform by ID
    const entity = await this.transformsRepository.getById(query.id, {});

    // Check if the transform exists
    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue("Transform"));
    }

    // Create a result object from the entity
    const resultData = TransformsGetResult.create(
      entity._id,
      entity.title, // Updated field
      entity.status, // Updated field
      entity.buyerId, // Updated field
      entity.sellerId, // Updated field
      entity.userId, // Updated field
      entity.orderId, // Updated field
      entity.type,
      entity.products || [], // Updated field
      entity.totalPrice, // Updated field
      new Date(),
      entity.transformRequest, // Updated field
      entity.transformDoc || [], // Updated field
      entity.withdrawRequest || false, // Updated field
      entity.bankAccount || [], // Updated field
    );

    // Return a successful result
    return AppResult.createSuccess<TransformsGetResult>(
      null,
      null,
      resultData,
    );
  }
}
