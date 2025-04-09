import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TenderQuotationsRepository } from "src/app/features/tenders/persistence/repositories/tender-quotations.repository";
import { TenderQuotationsDeleteCommand } from "./tender-quotations-delete.command";

@CommandHandler(TenderQuotationsDeleteCommand)
export class TenderQuotationsDeleteHandler
  implements ICommandHandler<TenderQuotationsDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
  ) { }

  public async execute(
    command: TenderQuotationsDeleteCommand,
  ): Promise<AppResult<null>> {
    const entity =
      await this
        .tenderQuotationsRepository
        .getById(
          command.id,
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

    if (command.userId != entity.userId) {
      return AppResult
        .createError(
          AppErrors.notRelateToYourAccount(),
        );
    }

    const isDeleted =
      await this
        .tenderQuotationsRepository
        .deleteById(
          command.id,
        );

    if (!isDeleted) {
      return AppResult
        .createError(
          AppErrors.operationFailed(),
        );
    }

    return AppResult
      .createSuccess<null>(
        null,
        null,
        null,
      );
  }
}
