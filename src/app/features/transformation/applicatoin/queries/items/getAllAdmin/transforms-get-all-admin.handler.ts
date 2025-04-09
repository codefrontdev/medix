import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TransformsGetAllAdminResult } from '../../../results/items/transforms-get-all-admin.result';
import { CompaniesRepository } from 'src/app/features/companies/persistence/repositories/companies.repository';
import { TransformsGetAllAdminQuery } from './stransforms-get-all-admin.query';
import { TransformsRepository } from 'src/app/features/transformation/persistence/repositories/stransforms.repository';
import { FilterQuery } from 'mongoose';
import { searchRegEx } from 'src/app/@core/utils/functions/reg-ex-functions';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';

@QueryHandler(TransformsGetAllAdminQuery)
export class TransformsGetAllAdminHandler
  implements IQueryHandler<TransformsGetAllAdminQuery, AppResult<Array<TransformsGetAllAdminResult>>> {
  
  constructor(
    private readonly transformsRepository: TransformsRepository,
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  public async execute(
    query: TransformsGetAllAdminQuery,
  ): Promise<AppResult<Array<TransformsGetAllAdminResult>>> {
    const filter: FilterQuery<any> = {};

    // Apply search filter
    if (query.search) {
      filter.$or = [
        { title: searchRegEx(query.search) },
        { description: searchRegEx(query.search) },
      ];
    }

    // Apply status filter
    if (query.status) {
      filter.status = query.status;
    }

    // Apply buyer filter
    if (query.buyerId) {
      filter.buyerId = createObjectId(query.buyerId);
    }

    // Apply seller filter
    if (query.sellerId) {
      filter.sellerId = createObjectId(query.sellerId);
    }

    // Fetch transforms from the repository
    const transforms = await this.transformsRepository.getAllAsResult(
      filter,
      {}, // Additional query options
      [], // Populate fields
      query.pageSize,
      query.pageNumber,
      query.withPaging,
    );

    // Map transforms with buyer and seller company details
    const results = await Promise.all(
      transforms.data.map(async (transform) => {
        const buyerCompany = await this.companiesRepository.getById(transform.buyerId);
        const sellerCompany = await this.companiesRepository.getById(transform.sellerId);

        return TransformsGetAllAdminResult.create(
          transform._id,
          transform.title,
          transform.status,
          transform.buyerId,
          transform.sellerId,
          transform.userId,
          transform.orderId,
          transform.type,
          transform.products,
          transform.totalPrice,
          transform.transformRequest,
          transform.transformDoc,
          transform.withdrawRequest,
          transform.bankAccount,
          transform.createdAt,
          transform.updatedAt,
          buyerCompany, // Attach buyer company details
          sellerCompany, // Attach seller company details
        );
      }),
    );

    // Return the result with pagination
    return AppResult.createSuccess<Array<TransformsGetAllAdminResult>>(
      null,
      null,
      results,
      transforms.paging,
    );
  }
}
