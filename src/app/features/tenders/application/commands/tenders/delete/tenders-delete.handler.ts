import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TendersDeleteCommand } from "./tenders-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TendersRepository } from "src/app/features/tenders/persistence/repositories/tenders.repository";

@CommandHandler(TendersDeleteCommand)
export class TendersDeleteHandler
  implements ICommandHandler<TendersDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly tendersRepository: TendersRepository,
  ) { }

  public async execute(
    command: TendersDeleteCommand,
  ): Promise<AppResult<null>> {
    const entity =
      await this
        .tendersRepository
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
        .tendersRepository
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
