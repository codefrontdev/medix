import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrdersDeleteCommand } from "./orders-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { OrdersRepository } from "src/app/features/orders/persistence/repositories/orders.repository";

@CommandHandler(OrdersDeleteCommand)
export class OrdersDeleteHandler
  implements ICommandHandler<OrdersDeleteCommand, AppResult<null>> {
  public constructor(
    private readonly ordersRepository: OrdersRepository,
  ) { }

  public async execute(
    command: OrdersDeleteCommand,
  ): Promise<AppResult<null>> {
    const entity =
      await this
        .ordersRepository
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
        .ordersRepository
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
