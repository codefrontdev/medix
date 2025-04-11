import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CompaniesDeleteCommand } from "./companies-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { CompaniesRepository } from "../../../persistence/repositories/companies.repository";


@CommandHandler(CompaniesDeleteCommand)
export class CompaniesDeleteHandler
  implements ICommandHandler<CompaniesDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) { }

  public async execute(
    command: CompaniesDeleteCommand,
  ): Promise<AppResult<null>> {
    const entity =
      await this
        .companiesRepository
        .getById(
          command.id,
        );

    if (entity === null) {
      throw AppResult
        .createError(
          AppErrors
            .nullValue(
              'object',
            ),
        );
    }

    if (command.userId != entity.userId) {
      throw AppResult.createError(AppErrors.notRelateToYourAccount());
    }

    const isDeleted =
      await this
        .companiesRepository
        .deleteById(
          command.id,
        );

    if (!isDeleted) {
      throw AppResult.createError(AppErrors.operationFailed());
    }

    return AppResult
      .createSuccess<null>(
        null,
        null,
        null,
      );
  }
}