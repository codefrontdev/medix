/** @format */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CategoriesRepository } from "../../../persistence/repositories/categories.repository";
import { CategoriesDeleteCommand } from "./categories-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";

@CommandHandler(CategoriesDeleteCommand)
export class CategoriesDeleteHandler
  implements ICommandHandler<CategoriesDeleteCommand, AppResult<null>>
{
  public constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public async execute(
    command: CategoriesDeleteCommand
  ): Promise<AppResult<null>> {
    const isDeleted = await this.categoriesRepository.deleteById(command.id);

    if (!isDeleted) {
      throw AppResult.createError(AppErrors.operationFailed());
    }

    return AppResult.createSuccess<null>(null, null, null);
  }
}
