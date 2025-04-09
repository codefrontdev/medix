import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ItemsUpsertCommand } from "./items-upsert.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { ItemsRepository } from "src/app/features/items/persistence/repositories/items.repository";
import { ItemFactory } from "../../../factories/item.factory";
import { ItemsGetResult } from "../../../results/items/items-get.result";
import { CompaniesRepository } from "src/app/features/companies/persistence/repositories/companies.repository";

@CommandHandler(ItemsUpsertCommand)
export class ItemsUpsertHandler
  implements ICommandHandler<ItemsUpsertCommand, AppResult<ItemsGetResult>> {
  public constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly itemFactory: ItemFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly companiesRepository: CompaniesRepository // Add companies repository
  ) {}

  public async execute(
    command: ItemsUpsertCommand,
  ): Promise<AppResult<ItemsGetResult>> {
    const isInsert = command.id === null;

    if (!isInsert) {
      // Fetch the existing item by ID
      const foundEntity = await this.itemsRepository.getById(command.id);

      if (foundEntity === null) {
        return AppResult.createError(
          AppErrors.nullValue("item"),
        );
      }

      // Verify the user is authorized to update the item
      if (command.userId !== foundEntity.userId) {
        return AppResult.createError(
          AppErrors.notRelateToYourAccount(),
        );
      }
      
    }else{
      await this.companiesRepository.updateItemNr(command.companyId, command.ItemNR);
    }
    // Save or update the item using the factory
    let entity = await this.itemFactory.save(
      command.id,
      command.name,
      command.SKUCode,
      command.manufacturer,
      command.brand,
      command.model,
      command.unit,
      command.categories,
      command.description,
      command.price,
      command.vat,
      command.stock,
      command.tags,
      command.image,
      command.attachments,
      command.status,
      command.type,
      command.companyId,  
      command.userId,
      command.ItemNR
    );
    console.log(entity)
    // Merge the entity with the event context
    entity = this.eventPublisher.mergeObjectContext(entity);
    entity.commit();
    console.log(entity)
    // Create a result to return
    const resultData = ItemsGetResult.create(
      entity._id,
      entity.name,
      entity.SKUCode,
      entity.manufacturer,
      entity.brand,
      entity.model,
      entity.unit,
      entity.categories,
      entity.description,
      entity.price,
      entity.vat,
      entity.stock,
      entity.tags,
      entity.image,
      entity.attachments || [],
      entity.status,
      entity.type,
      entity.companyId,
      entity.userId,
      entity.ItemNR,
    );

    return AppResult.createSuccess<ItemsGetResult>(
      null,
      null,
      resultData,
    );
  }
}
