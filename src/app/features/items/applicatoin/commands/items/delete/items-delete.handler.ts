import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ItemsDeleteCommand } from "./items-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { ItemsRepository } from "src/app/features/items/persistence/repositories/items.repository";

@CommandHandler(ItemsDeleteCommand)
export class ItemsDeleteHandler
  implements ICommandHandler<ItemsDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly itemsRepository: ItemsRepository,
  ) {}

  public async execute(
    command: ItemsDeleteCommand,
  ): Promise<AppResult<null>> {
    // Fetch the item by ID
    const entity = await this.itemsRepository.getById(command.id);

    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue("item"));
    }

    // Verify that the user performing the deletion is authorized
    /*if (command.userId !== entity.userId) {
      throw AppResult.createError(
        AppErrors.notRelateToYourAccount(),
      );
    }*/

    // Perform the deletion
    const isDeleted = await this.itemsRepository.deleteById(command.id);

    if (!isDeleted) {
      throw AppResult.createError(AppErrors.operationFailed());
    }

    // Return success
    return AppResult.createSuccess<null>(null, null, null);
  }
}
