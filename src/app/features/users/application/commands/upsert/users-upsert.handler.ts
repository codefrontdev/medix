import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UsersUpsertCommand } from "./users-upsert.command";
import { UsersRepository } from "../../../persistence/repositories/users.repository";
import { UserFactory } from "../../factories/user.factory";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { User } from "../../../domain/entities/user";
import { UsersError } from "../../../domain/errors/users-error";
import { UsersGetResult } from "../../results/users-get.result";
import { UserUpdateFactory } from "../../factories/user-update.factory";

@CommandHandler(UsersUpsertCommand)
export class UsersUpsertHandler
  implements ICommandHandler<UsersUpsertCommand, AppResult<UsersGetResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userFactory: UserUpdateFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  public async execute(
    command: UsersUpsertCommand,
  ): Promise<AppResult<UsersGetResult>> {
    const foundEntity = await this.usersRepository.getById(command.id);

    if (!foundEntity) {
      throw AppResult.createError(UsersError.userNotFound);
    }

    const updatedEntity = await this.userFactory.save(
      command.id,
      command.nickName,
      command.phoneNumber,
      command.gender,
      command.accountType,
      command.region,
      command.city,
      command.address,
      command.identityType,
      command.identityNo,
      command.residenceNo,
      command.dateOfBirth,
    );

    const resultData = UsersGetResult.create(
      updatedEntity._id,
      updatedEntity.nickName,
      updatedEntity.email,
      updatedEntity.phoneNumber,
      updatedEntity.isEmailConfirmed,
      updatedEntity.isPhoneNumberConfirmed,
      updatedEntity.role,
      updatedEntity.gender,
      updatedEntity.accountType,
      updatedEntity.region,
      updatedEntity.city,
      updatedEntity.address,
      updatedEntity.identityType,
      updatedEntity.identityNo,
      updatedEntity.residenceNo,
      updatedEntity.dateOfBirth,
      updatedEntity.isVerified,
    );

    return AppResult.createSuccess<UsersGetResult>(null, null, resultData);
  }
}

