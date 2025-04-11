import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TransformsChangeStatusCommand } from "./transforms-change-status.command";

import { TransformsGetResult } from "../../../results/items/transforms-get.result";
import { TransformStatusEnum } from "src/app/features/transformation/domain/constants/enum/transform-status-enum";
import { TransformsError } from "src/app/features/transformation/domain/errors/transforms-error";
import { Product } from "src/app/features/orders/domain/entities/product";
import { TransformFactory } from "../../../factories/transform.factory";
import { TransformsRepository } from "src/app/features/transformation/persistence/repositories/stransforms.repository";


@CommandHandler(TransformsChangeStatusCommand)
export class TransformsChangeStatusHandler
  implements ICommandHandler<TransformsChangeStatusCommand, AppResult<TransformsGetResult>>
{
  public constructor(
    private readonly transformsRepository: TransformsRepository,
    private readonly transformFactory: TransformFactory,
    private readonly eventPublisher: EventPublisher
  ) {
    console.log('TransformsChangeStatusHandler initialized');
  }

  public async execute(
    command: TransformsChangeStatusCommand
  ): Promise<AppResult<TransformsGetResult>> {
    // Fetch the transform by ID
    const foundTransformEntity = await this.transformsRepository.getById(command.id);

    // Check if the transform exists
    if (!foundTransformEntity) {
      throw AppResult.createError(AppErrors.nullValue("transform"));
    }

    

    // Business rule validation
    if (
      command.status === TransformStatusEnum.REFUSED &&
      foundTransformEntity.status === TransformStatusEnum.ACCEPTED
    ) {
      throw AppResult.createError(
        TransformsError.invalidStatusTransition("Cannot refuse an already accepted transform")
      );
    }

    // Update the transform entity with the new status
    let transformEntity = await this.transformFactory.save(
      foundTransformEntity._id,
      foundTransformEntity.title,
      command.status,
      foundTransformEntity.buyerId,
      foundTransformEntity.sellerId,
      foundTransformEntity.userId,
      foundTransformEntity.orderId,
      foundTransformEntity.type,
      foundTransformEntity.products,
      foundTransformEntity.totalPrice,
      command.transformRequest as boolean,
      foundTransformEntity.transformDoc,
      command.withdrawRequest as boolean,
      foundTransformEntity.bankAccount,
    );

    // Merge context and publish domain events
    transformEntity = this.eventPublisher.mergeObjectContext(transformEntity);
    transformEntity.commit();

    // Prepare result data
    const resultData = TransformsGetResult.create(
      transformEntity._id,
      transformEntity.title,
      transformEntity.status,
      transformEntity.buyerId.toString(),
      transformEntity.sellerId.toString(),
      transformEntity.userId.toString(),
      transformEntity.orderId.toString(),
      transformEntity.type,
      transformEntity.products as Product[],
      transformEntity.totalPrice,
      new Date(),
      transformEntity.transformRequest,
      transformEntity.transformDoc,
      transformEntity.withdrawRequest,
      transformEntity.bankAccount,
    );

    return AppResult.createSuccess<TransformsGetResult>(
      null,
      null,
      resultData
    );
  }
}
