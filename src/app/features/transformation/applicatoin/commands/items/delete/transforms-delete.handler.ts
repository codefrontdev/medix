import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TransformsDeleteCommand } from "./transforms-delete.command";
import { TransformsRepository } from "src/app/features/transformation/persistence/repositories/stransforms.repository";

@CommandHandler(TransformsDeleteCommand)
export class TransformsDeleteHandler
  implements ICommandHandler<TransformsDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly TransformsRepository: TransformsRepository,
  ) {}

  public async execute(
    command: TransformsDeleteCommand,
  ): Promise<AppResult<null>> {
    // Fetch the Transform by ID
    const entity = await this.TransformsRepository.getById(command.id);

    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue("Transform"));
    }

    // Verify that the user performing the deletion is authorized
    /*if (command.userId !== entity.userId) {
      throw AppResult.createError(
        AppErrors.notRelateToYourAccount(),
      );
    }*/

    // Perform the deletion
    const isDeleted = await this.TransformsRepository.deleteById(command.id);

    if (!isDeleted) {
      throw AppResult.createError(AppErrors.operationFailed());
    }

    // Return success
    return AppResult.createSuccess<null>(null, null, null);
  }
}
