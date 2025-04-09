import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FilterQuery } from 'mongoose';
import { Tender } from '../../../../domain/entities/tender';
import { TendersGetAllQuery } from './tenders-get-all.query';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { TendersGetAllResult } from '../../../results/tenders/tenders-get-all.result';
import { TendersRepository } from '../../../../persistence/repositories/tenders.repository';
import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';

@QueryHandler(TendersGetAllQuery)
export class TendersGetAllHandler
  implements IQueryHandler<TendersGetAllQuery, AppResult<Array<TendersGetAllResult>>> {

  public constructor(
    private readonly tendersRepository: TendersRepository,
  ) { }

  public async execute(
    query: TendersGetAllQuery,
  ): Promise<AppResult<Array<TendersGetAllResult>>> {
    const filter: FilterQuery<Tender> = {};

    if (query.search !== null) {
      filter.$or = [
        {
          title:
            searchRegEx(
              query.search,
            ),
        },
        {
          TenderNr:
            searchRegEx(
              query.search,
            ),
        },
      ];
    }

    if (query.type !== null) {
      filter.type = query.type;
    }

    if (query.status !== null) {
      filter.status = query.status;
    }

    if (query.categoriesIds !== null && query.categoriesIds.length > 0) {
      filter.categoriesIds = {
        $in:
          query
            .categoriesIds
            .map(
              createObjectId,
            ),
      };
    }

    if (query.companyId !== null) {
      filter.companyId =
        createObjectId(
          query.companyId,
        );
    }
    console.log('query.userId', query.userId);
    console.log('filter', filter);
    if (query.userId !== null) {
      filter.userId =
         createObjectId(
           query.userId,
         );
    }

    const result =
      await this
        .tendersRepository
        .getAllAsResult(
          filter,
          {},
          [
            {
              path: 'categories',
              select: 'name',
            },
          ],
          query.pageSize,
          query.pageNumber,
          query.withPaging,
          [
            {
              field: OrderByEnum.CREATED_AT,
              direction: OrderDirectionEnum.DESC,
            },
            {
              field: OrderByEnum.TITLE,
              direction: OrderDirectionEnum.ASC,
            },
          ]
        );
    console.log('result', result);
    console.log('data', result.data);    
    const entitiesResults =
      result
        .data
        .map(
          element => {
            console.log(element.TenderNr)
            return TendersGetAllResult
              .create(
                element._id,
                element.title,
                element.minValue,
                element.value,
                element.endDate,
                element.deliverDate,
                element.type,
                element.status,
                element.categoriesIds,
                element
                  .categories
                  .map(
                    category => category.name
                  ),
                element.region,
                element.city,
                element.attachmentRequired,
                element.receiveDocumentsType,
                element.Paylater,
                element.companyId,
                element.userId,
                element.TenderNr,
              );
          }
        );

    return AppResult.createSuccess<Array<TendersGetAllResult>>(
      null,
      null,
      entitiesResults,
      result.paging
    );
  }
}
