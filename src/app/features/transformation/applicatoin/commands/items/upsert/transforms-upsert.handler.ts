import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";

//import { CompaniesRepository } from "src/app/features/companies/persistence/repositories/companies.repository";
import { TransformsUpsertCommand } from "./transforms-upsert.command";
import { TransformsGetResult } from "../../../results/items/transforms-get.result";

import { TransformFactory } from "../../../factories/transform.factory";
import { TransformsRepository } from "src/app/features/transformation/persistence/repositories/stransforms.repository";

@CommandHandler(TransformsUpsertCommand)
export class TransformsUpsertHandler
  implements ICommandHandler<TransformsUpsertCommand, AppResult<TransformsGetResult>>
{
  public constructor(
    private readonly transformsRepository: TransformsRepository,
    private readonly transformFactory: TransformFactory,
    private readonly eventPublisher: EventPublisher
  ) {
    console.log('TransformsRepository initialized');
  }

  public async execute(
    command: TransformsUpsertCommand,
  ): Promise<AppResult<TransformsGetResult>> {
    const isInsert = command.id === null;

    if (!isInsert) {
      // Fetch the existing Transform by ID
      const foundEntity = await this.transformsRepository.getById(command.id);

      if (foundEntity === null) {
        return AppResult.createError(AppErrors.nullValue("Transform"));
      }

      /*// Verify the user is authorized to update the Transform
      if (command.userId !== foundEntity.userId) {
        return AppResult.createError(AppErrors.notRelateToYourAccount());
      }*/
    } 
    
    // Save or update the Transform using the factory
    let entity = await this.transformFactory.save(
      command.id,
      command.title,
      command.status,
      command.buyerId,
      command.sellerId,
      command.userId,
      command.orderId,
      command.type,
      command.products || [],
      command.totalPrice,
      command.transformRequest,
      command.transformDoc || [],
      command.withdrawRequest,
      command.bankAccount || []
    );

    // Merge the entity with the event context
    entity = this.eventPublisher.mergeObjectContext(entity);
    entity.commit();

    // Prepare the result data
    const resultData = TransformsGetResult.create(
      entity._id,
      entity.title,
      entity.status,
      entity.buyerId,
      entity.sellerId,
      entity.userId,
      entity.orderId,
      entity.type,
      entity.products,
      entity.totalPrice,
      new Date(),
      entity.transformRequest,      
      entity.transformDoc || [],
      entity.withdrawRequest,
      entity.bankAccount || [],
    );

    // Return the result
    return AppResult.createSuccess<TransformsGetResult>(null, null, resultData);
  }
}
