import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoriesRepository } from "../../../persistence/repositories/categories.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { CategoriesGetAllQuery } from "./categories-get-all.query";
import { CategoriesGetAllResult } from "../../results/categories-get-all.result";
import { Category } from "../../../domain/entities/category";
import { FilterQuery } from "mongoose";
import { ObjectId } from "mongodb";
import { searchRegEx } from "src/app/@core/utils/functions/reg-ex-functions";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";
import { OrderByEnum } from "src/app/@core/values/enums/order-by.enum";
import { OrderDirectionEnum } from "src/app/@core/values/enums/order-direction.enum";
import { CategoriesGetResult } from "../../results/categories-get.result";


@QueryHandler(CategoriesGetAllQuery)
export class CategoriesGetAllHandler
  implements ICommandHandler<CategoriesGetAllQuery, AppResult<Array<CategoriesGetAllResult>>> {
  public constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) { }

  public async execute(
    query: CategoriesGetAllQuery,
  ): Promise<AppResult<Array<CategoriesGetAllResult>>> {
    const filter: FilterQuery<Category> = {};

    if (query.search !== null) {
      filter.$or = [
        {
          name:
            searchRegEx(
              query.search
            ),
          TagName:
            searchRegEx(
              query.search
            ),
        },
      ];
    }

    if (query.parentId === 'null') {
      filter.parentId = null;
    }
    else if (query.parentId != null && query.parentId !== 'null') {
      filter.parentId =
        createObjectId(
          query.parentId,
        );
    }

    const result =
      await this
        .categoriesRepository
        .getAllAsResult(
          filter,
          {},
          [
            {
              path: 'parent',
              select: '',
            },
          ],
          query.pageSize,
          query.pageNumber,
          query.withPaging,
          [
            {
              field: OrderByEnum.NAME,
              direction: OrderDirectionEnum.ASC,
            },
          ]
        );

    const entitiesResults =
      result
        .data
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(
          (element) => {
            return CategoriesGetAllResult
              .create(
                element._id,
                element.name,
                element.TagName,
                element.parentId,
                element.parentId === null || element.parent === null ?
                  null
                  :
                  CategoriesGetResult
                    .create(
                      element.parent._id,
                      element.parent.name,
                      element.parent.TagName,
                      element.parent.parentId,
                      null,
                      element.parent.displayOrder,
                    ),
                element.displayOrder,
              );
          }
        );

    return AppResult
      .createSuccess<Array<CategoriesGetAllResult>>(
        null,
        null,
        entitiesResults,
        result.paging,
      );
  }
}