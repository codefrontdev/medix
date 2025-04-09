import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthsUpsertCommand } from "./auth-update.command";
import { UsersGetResult } from "src/app/features/users/application/results/users-get.result";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";

import { UsersError } from "src/app/features/users/domain/errors/users-error";
import { AuthFactory } from "../../factories/auth.factory";



@CommandHandler(AuthsUpsertCommand)
export class AuthsUpsertHandler
  implements ICommandHandler<AuthsUpsertCommand, AppResult<UsersGetResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authFactory: AuthFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  public async execute(
    command: AuthsUpsertCommand,
  ): Promise<AppResult<UsersGetResult>> {
    const isInsert = command.id === null;

    if (isInsert) {
      var foundEntity =
        await this
          .usersRepository
          .getByEmail(
            command.email,
          );

      if (foundEntity !== null) {
        return AppResult
          .createError(
            UsersError.emailTaken,
          );
      }

      if (command.phoneNumber !== '') {
        foundEntity =
          await this
            .usersRepository
            .getByPhoneNumber(
              command.phoneNumber,
            );

        if (foundEntity !== null) {
          return AppResult
            .createError(
              UsersError.phoneNumberTaken,
            );
        }
      }
    }

    var entity =
      await this
        .authFactory
        .save(
          command.id,
          command.nickName,
          command.email,
          command.phoneNumber,
          command.role,
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

    const resultData =
      UsersGetResult
        .create(
          entity._id,
          entity.nickName,
          entity.email,
          entity.phoneNumber,
          entity.isEmailConfirmed,
          entity.isPhoneNumberConfirmed,
          entity.role,
          entity.gender,
          entity.accountType,
          entity.region,
          entity.city,
          entity.address,
          entity.identityType,
          entity.identityNo,
          entity.residenceNo,
          entity.dateOfBirth,
          entity.isVerified,
        );

    return AppResult
      .createSuccess<UsersGetResult>(
        null,
        null,
        resultData,
      );
  }
}