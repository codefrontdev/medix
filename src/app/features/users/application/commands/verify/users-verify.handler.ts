/** @format */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UsersVerifyCommand } from "./users-verify.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { UsersRepository } from "../../../persistence/repositories/users.repository";
import { ObjectId } from "mongodb";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";

@CommandHandler(UsersVerifyCommand)
export class UsersVerifyHandler
  implements ICommandHandler<UsersVerifyCommand, AppResult<null>>
{
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(command: UsersVerifyCommand): Promise<AppResult<null>> {
    const entity = await this.usersRepository.getById(command.id);

    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue("object"));
    }

    entity.isVerified = command.isVerified;

    const updatedEntity = await this.usersRepository.getAndUpdate(
      {
        _id: createObjectId(command.id),
      },
      entity
    );

    return AppResult.createSuccess<null>(null, null, null);
  }
}
