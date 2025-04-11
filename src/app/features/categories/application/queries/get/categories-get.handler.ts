/** @format */

import { QueryHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoriesRepository } from "../../../persistence/repositories/categories.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { CategoriesGetQuery } from "./categories-get.query";
import { CategoriesGetResult } from "../../results/categories-get.result";

@QueryHandler(CategoriesGetQuery)
export class CategoriesGetHandler
  implements ICommandHandler<CategoriesGetQuery, AppResult<CategoriesGetResult>>
{
  public constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public async execute(
    query: CategoriesGetQuery
  ): Promise<AppResult<CategoriesGetResult>> {
    const entity = await this.categoriesRepository.getById(query.id, {}, [
      {
        path: "parent",
        select: "",
      },
    ]);

    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue("object"));
    }

    const resultData = CategoriesGetResult.create(
      entity._id,
      entity.name,
      entity.TagName,
      entity.parentId,
      entity.parentId === null || entity.parent === null ?
        null
      : CategoriesGetResult.create(
          entity.parent._id,
          entity.parent.name,
          entity.parent.TagName,
          entity.parent.parentId,
          null,
          entity.parent.displayOrder
        ),
      entity.displayOrder
    );

    return AppResult.createSuccess<CategoriesGetResult>(null, null, resultData);
  }
}
