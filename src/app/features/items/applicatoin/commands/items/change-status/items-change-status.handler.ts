import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ItemsChangeStatusCommand } from "./items-change-status.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { ItemsRepository } from "src/app/features/items/persistence/repositories/items.repository";
import { ItemFactory } from "../../../factories/item.factory";
import { ItemsGetResult } from "../../../results/items/items-get.result";
import { ItemStatusEnum } from "src/app/features/items/domain/constants/enum/item-status-enum";
import { ItemsError } from "src/app/features/items/domain/errors/items-error";

@CommandHandler(ItemsChangeStatusCommand)
export class ItemsChangeStatusHandler
  implements ICommandHandler<ItemsChangeStatusCommand, AppResult<ItemsGetResult>> {
  public constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly itemFactory: ItemFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(
    command: ItemsChangeStatusCommand,
  ): Promise<AppResult<ItemsGetResult>> {
    // Fetch the item by ID
    const foundItemEntity = await this.itemsRepository.getById(command.id);

    // Check if item exists
    if (foundItemEntity === null) {
      return AppResult.createError(AppErrors.nullValue("item"));
    }

    // Verify that the user performing the change is authorized
    if (command.userId !== foundItemEntity.userId) {
      return AppResult.createError(AppErrors.notRelateToYourAccount());
    }

    // Check for business rule violations (e.g., specific status logic)
    if (
      command.status === ItemStatusEnum.OUT_OF_STOCK &&
      foundItemEntity.stock > 0
    ) {
      return AppResult.createError(ItemsError.stockMustBeZeroForOutOfStock());
    }

    // Update the item entity with the new status
    let itemEntity = await this.itemFactory.save(
      foundItemEntity._id,
      foundItemEntity.name,
      foundItemEntity.SKUCode,
      foundItemEntity.manufacturer,
      foundItemEntity.brand,
      foundItemEntity.model,
      foundItemEntity.unit,
      foundItemEntity.categories,
      foundItemEntity.description,
      foundItemEntity.price,
      foundItemEntity.vat,
      foundItemEntity.stock,
      foundItemEntity.tags,
      foundItemEntity.image,
      foundItemEntity.attachments,
      command.status,
      foundItemEntity.type,
      foundItemEntity.companyId,
      foundItemEntity.userId,
      foundItemEntity.ItemNR,
    );

    // Merge context and publish domain events
    itemEntity = this.eventPublisher.mergeObjectContext(itemEntity);
    itemEntity.commit();

    // Convert `fileId` in attachments to string
    const attachments = itemEntity.attachments?.map((attachment) => ({
      name: attachment.name,
      description: attachment.description,
      fileId:
        typeof attachment.fileId === "string"
          ? attachment.fileId
          : attachment.fileId, // Convert ObjectId to string
      filepath: attachment.filepath || null,
    })) || [];

    // Create a result to return
    const resultData = ItemsGetResult.create(
      itemEntity._id,
      itemEntity.name,
      itemEntity.SKUCode,
      itemEntity.manufacturer,
      itemEntity.brand,
      itemEntity.model,
      itemEntity.unit,
      itemEntity.categories,
      itemEntity.description,
      itemEntity.price,
      itemEntity.vat,
      itemEntity.stock,
      itemEntity.tags,
      itemEntity.image,
      attachments, // Use converted attachments
      itemEntity.status,
      itemEntity.type,
      itemEntity.companyId,
      itemEntity.userId,
      itemEntity.ItemNR,
    );

    return AppResult.createSuccess<ItemsGetResult>(null, null, resultData);
  }
}
