import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthInfoUpdateCommand } from "./auth-info-update.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { UserUpdateFactory } from "src/app/features/users/application/factories/user-update.factory";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";

@CommandHandler(AuthInfoUpdateCommand)
export class AuthInfoUpdateHandler
  implements ICommandHandler<AuthInfoUpdateCommand, AppResult<UsersInfoResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userUpdateFactory: UserUpdateFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  public async execute(
    command: AuthInfoUpdateCommand,
  ): Promise<AppResult<UsersInfoResult>> {
    var entity =
      await this
        .userUpdateFactory
        .save(
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

    entity = this
      .eventPublisher
      .mergeObjectContext(
        entity,
      );

    entity
      .commit();

    const foundUser =
      await this
        .usersRepository
        .getById(
          command.id
        );

    const resultData =
      UsersInfoResult
        .create(
          foundUser._id,
          foundUser.nickName,
          foundUser.email,
          foundUser.phoneNumber,
          foundUser.isEmailConfirmed,
          foundUser.isPhoneNumberConfirmed,
          foundUser.role,
          foundUser.gender,
          foundUser.accountType,
          foundUser.region,
          foundUser.city,
          foundUser.address,
          foundUser.identityType,
          foundUser.identityNo,
          foundUser.residenceNo,
          foundUser.dateOfBirth,
          foundUser.isVerified,
        );

    return AppResult
      .createSuccess<UsersInfoResult>(
        null,
        null,
        resultData,
      );
  }
}