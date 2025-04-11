import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";

import * as bcrypt from 'bcryptjs';
import { AuthInfoChangePasswordCommand } from "./auth-info-change-password.command";
import { AuthTokensResult } from "src/app/features/auth/application/results/auth-tokens.result";
import { AuthInfoError } from "../../../domain/errors/auth-info-error";
import { AuthService } from "src/app/features/auth/application/services/auth.service";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";

@CommandHandler(AuthInfoChangePasswordCommand)
export class AuthInfoChangePasswordHandler
  implements ICommandHandler<AuthInfoChangePasswordCommand, AppResult<AuthTokensResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) { }

  public async execute(
    command: AuthInfoChangePasswordCommand,
  ): Promise<AppResult<AuthTokensResult>> {
    const foundUser =
      await this
        .usersRepository
        .getById(
          command.userId,
        );

    if (foundUser === null) {
      throw AppResult
        .createError(
          AuthInfoError.userNotFound,
        );
    }

    const isPasswordMatched =
      await bcrypt
        .compare(
          command.oldPassword,
          foundUser.password,
        );

    if (!isPasswordMatched) {
      throw AppResult
        .createError(
          AuthInfoError.passwordIncorrect,
        );
    }

    const resultTokens =
      await this
        .authService
        .changePassword(
          foundUser,
          command.newPassword
        );

    return AppResult
      .createSuccess<AuthTokensResult>(
        null,
        null,
        resultTokens,
      );
  }
}