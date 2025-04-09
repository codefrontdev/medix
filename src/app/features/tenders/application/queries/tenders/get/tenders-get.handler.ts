import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { AppErrors } from 'src/app/@core/shared/domain/errors/app-errors';
import { TendersGetQuery } from './tenders-get.query';
import { TendersGetResult } from '../../../results/tenders/tenders-get.result';
import { TendersRepository } from '../../../../persistence/repositories/tenders.repository';

@QueryHandler(TendersGetQuery)
export class TendersGetHandler
  implements ICommandHandler<TendersGetQuery, AppResult<TendersGetResult>> {

  public constructor(
    private readonly tendersRepository: TendersRepository,
  ) { }

  public async execute(
    query: TendersGetQuery,
  ): Promise<AppResult<TendersGetResult>> {
    const entity =
      await this
        .tendersRepository
        .getById(
          query.id,
          {},
          [
            {
              path: 'categories',
              select: 'name',
            },
          ],
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
      TendersGetResult.create(
        entity._id,
        entity.title,
        entity.minValue,
        entity.value,
        entity.endDate,
        entity.deliverDate,
        entity.type,
        entity.status,
        entity.categoriesIds,
        entity
          .categories
          .map(
            category => category.name
          ),
        entity.region,
        entity.city,
        entity.fileName,
        entity.fileDescription,
        entity.fileId,
        entity.attachmentName,
        entity.attachmentDescription,
        entity.attachmentId,
        entity.attachmentRequired,
        entity.attachmentDeliverDays,
        entity.receiveDocumentsType,
        entity.Paylater,
        entity.contactInfo,
        entity.companyId,
        entity.userId,
        entity.products,
        entity.TenderNr
      );

    return AppResult
      .createSuccess<TendersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
