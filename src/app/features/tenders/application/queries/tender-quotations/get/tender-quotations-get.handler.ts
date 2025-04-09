import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { TenderQuotationsGetQuery } from './tender-quotations-get.query';
import { AppErrors } from 'src/app/@core/shared/domain/errors/app-errors';
import { TenderQuotationsRepository } from 'src/app/features/tenders/persistence/repositories/tender-quotations.repository';
import { TenderQuotationsGetResult } from '../../../results/tender-quotations/tender-quotations-get.result';

@QueryHandler(TenderQuotationsGetQuery)
export class TenderQuotationsGetHandler
  implements ICommandHandler<TenderQuotationsGetQuery, AppResult<TenderQuotationsGetResult>> {

  public constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
  ) { }

  public async execute(
    query: TenderQuotationsGetQuery,
  ): Promise<AppResult<TenderQuotationsGetResult>> {
    const entity =
      await this
        .tenderQuotationsRepository
        .getById(
          query.id,
          {},
          null,
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
      TenderQuotationsGetResult.create(
        entity._id,
        /*entity.value,
        entity.description,
        */
        entity.products,
        entity.paymentMethod,
        entity.DeadLineDate,
        entity.DeliveryMethod,
        entity.contactMethod,
        entity.deliverDays,
        entity.status,
        entity.tenderId,
        entity.companyId,
        entity.userId,
        entity.OpportunityNr,
      );

    return AppResult
      .createSuccess<TenderQuotationsGetResult>(
        null,
        null,
        resultData,
      );
  }
}
