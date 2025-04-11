/** @format */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UsersDeleteCommand } from "./users-delete.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { UsersRepository } from "../../../persistence/repositories/users.repository";

@CommandHandler(UsersDeleteCommand)
export class UsersDeleteHandler
  implements ICommandHandler<UsersDeleteCommand, AppResult<null>>
{
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(command: UsersDeleteCommand): Promise<AppResult<null>> {
    const isDeleted = await this.usersRepository.deleteById(command.id);

    if (!isDeleted) {
      throw AppResult.createError(AppErrors.operationFailed());
    }

    return AppResult.createSuccess<null>(null, null, null);
  }
}
