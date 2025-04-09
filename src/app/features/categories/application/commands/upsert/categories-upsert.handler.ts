import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";

import { CategoriesUpsertCommand } from "./categories-upsert.command";
import { CategoriesGetResult } from "../../results/categories-get.result";
import { CategoriesRepository } from "../../../persistence/repositories/categories.repository";
import { CategoryFactory } from "../../factories/category.factory";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";


@CommandHandler(CategoriesUpsertCommand)
export class CategoriesUpsertHandler
  implements ICommandHandler<CategoriesUpsertCommand, AppResult<CategoriesGetResult>> {
  public constructor(
    private readonly categoryFactory: CategoryFactory,
  ) { }

  public async execute(
    command: CategoriesUpsertCommand,
  ): Promise<AppResult<CategoriesGetResult>> {
    const entity =
      await this
        .categoryFactory
        .save(
          command.id,
          command.name,
          command.TagName,
          command.parentId,
          command.displayOrder,
        );

    if (entity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'category',
            ),
        );
    }

    const resultData =
      CategoriesGetResult
        .create(
          entity._id,
          entity.name,
          entity.TagName,
          entity.parentId,
          null,
          entity.displayOrder,
        );

    return AppResult
      .createSuccess<CategoriesGetResult>(
        null,
        null,
        resultData,
      );
  }
}