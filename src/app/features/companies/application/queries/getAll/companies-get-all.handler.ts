import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { FilterQuery } from "mongoose";
import { CompaniesRepository } from "../../../persistence/repositories/companies.repository";
import { CompaniesGetAllResult } from "../../results/companies-get-all.result";
import { Company } from "../../../domain/entities/company";
import { CompaniesGetAllQuery } from "./companies-get-all.query";
import { searchRegEx } from "src/app/@core/utils/functions/reg-ex-functions";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";
import { OrderDirectionEnum } from "src/app/@core/values/enums/order-direction.enum";
import { OrderByEnum } from "src/app/@core/values/enums/order-by.enum";


@QueryHandler(CompaniesGetAllQuery)
export class CompaniesGetAllHandler
  implements IQueryHandler<CompaniesGetAllQuery, AppResult<Array<CompaniesGetAllResult>>> {
  public constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) { }

  public async execute(
    query: CompaniesGetAllQuery,
  ): Promise<AppResult<Array<CompaniesGetAllResult>>> {
    const filter: FilterQuery<Company> = {};

    if (query.search !== null) {
      filter.$or = [
        {
          nameAr:
            searchRegEx(
              query.search
            ),
        },
        {
          nameEn:
            searchRegEx(
              query.search
            ),
        },
        {
          CompanyNr:
            searchRegEx(
              query.search
            ),
        },
      ];
    }

    if (query.userId !== null) {
      filter.userId =
        createObjectId(
          query.userId,
        );
    }

    const result =
      await this
        .companiesRepository
        .getAllAsResult(
          filter,
          { },
          null,
          query.pageSize,
          query.pageNumber,
          query.withPaging,
          [{ field: OrderByEnum.CREATED_AT, direction: OrderDirectionEnum.DESC }],
        );   
    const entitiesResults =
      result
        .data
        .map(
          (element) => {
            return CompaniesGetAllResult
              .create(
                element._id,
                element.nameAr,
                element.nameEn,
                element.registrationNumber,
                element.ownerType,
                element.CompanyNr,
              );
          }
        );

    return AppResult
      .createSuccess<Array<CompaniesGetAllResult>>(
        null,
        null,
        entitiesResults,
        result.paging,
      );
  }
}