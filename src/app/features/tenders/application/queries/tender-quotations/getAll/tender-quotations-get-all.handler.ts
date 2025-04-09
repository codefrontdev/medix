import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FilterQuery } from 'mongoose';
import { TenderQuotationsGetAllQuery } from './tender-quotations-get-all.query';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';
import { TenderQuotation } from 'src/app/features/tenders/domain/entities/tender-quotation';
import { TenderQuotationsRepository } from '../../../../persistence/repositories/tender-quotations.repository';
import { TenderQuotationsGetAllResult } from '../../../results/tender-quotations/tender-quotations-get-all.result';
import { CompaniesGetResult } from 'src/app/features/companies/application/results/companies-get.result';
import { CompaniesResult } from 'src/app/features/companies/application/results/companies.result';

@QueryHandler(TenderQuotationsGetAllQuery)
export class TenderQuotationsGetAllHandler
  implements IQueryHandler<TenderQuotationsGetAllQuery, AppResult<Array<TenderQuotationsGetAllResult>>> {

  public constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
  ) { }

  public async execute(
    query: TenderQuotationsGetAllQuery,
  ): Promise<AppResult<Array<TenderQuotationsGetAllResult>>> {
    const filter: FilterQuery<TenderQuotation> = {};

    if (query.status !== null) {
      filter.status = query.status;
    }
    if (query.userId !== null) {
      filter.userId = createObjectId(query.userId);
    }
    if (query.tenderId !== null) {
      if (Array.isArray(query.tenderId)) {
        filter.tenderId = { $in: query.tenderId.map(id => createObjectId(id)) };
      } else {
        filter.tenderId = createObjectId(query.tenderId);
      }
    }

    const result =
      await this
        .tenderQuotationsRepository
        .getAllAsResult(
          filter,
          {},
          [
            {
              path: 'company',
              select: '_id nameAr nameEn website address contactInfo CompanyNr',
            },
          ],
          query.pageSize,
          query.pageNumber,
          query.withPaging,
          [
            {
              field: OrderByEnum.VALUE,
              direction: OrderDirectionEnum.DESC,
            },
          ]
        );

    const entitiesResults =
      result
        .data
        .map(
          element => {
            return TenderQuotationsGetAllResult
              .create(
                element._id,
                /*
                element.value,
                element.description,
                */
                element.products,
                element.paymentMethod,
                element.DeadLineDate,
                element.DeliveryMethod,
                element.contactMethod,
                element.deliverDays,
                element.status,
                element.tenderId,
                element.companyId,
                CompaniesResult
                  .createFromDomain(
                    element.company,
                  ),
                element.userId,
                element.OpportunityNr,
              );
          }
        );

    return AppResult.createSuccess<Array<TenderQuotationsGetAllResult>>(
      null,
      null,
      entitiesResults,
      result.paging
    );
  }
}
