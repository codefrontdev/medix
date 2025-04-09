import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthError } from "../../../domain/errors/auth-error";

import { AuthResetPasswordCommand } from "./auth-reset-password.command";
import { AuthSentCodeResult } from "../../results/auth-sent-code.result";
import { SentCodeEnum } from "../../../@core/values/enums/sent-code.enum";
import { SentCodeProviderService } from "../../services/sent-code-provider.service";
import { AuthTokensResult } from "../../results/auth-tokens.result";
import { UserCodesRepository } from "../../../persistence/repositories/user-codes.repository";
import { AuthService } from "../../services/auth.service";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";


@CommandHandler(AuthResetPasswordCommand)
export class AuthResetPasswordHandler
  implements ICommandHandler<AuthResetPasswordCommand, AppResult<AuthTokensResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userCodesRepository: UserCodesRepository,
    private readonly authService: AuthService,
  ) { }

  public async execute(
    command: AuthResetPasswordCommand,
  ): Promise<AppResult<AuthTokensResult>> {
    const foundUserCode =
      await this
        .userCodesRepository
        .checkIfExists(
          command.email,
          command.code,
          SentCodeEnum.resetPassword.type,
        );

    if (foundUserCode === null) {
      return AppResult
        .createError(
          AuthError.invalidCode,
        );
    }

    const expirationCondition = foundUserCode.expirationDate < new Date();
    if (expirationCondition) {
      return AppResult
        .createError(
          AuthError.codeExpired,
        );
    }

    const foundUser =
      await this
        .usersRepository
        .getByEmail(
          command.email,
        );

    const resultTokens =
      await this
        .authService
        .changePassword(
          foundUser,
          command.newPassword
        );

    await this
      .userCodesRepository
      .deleteById(
        foundUserCode._id,
      );

    return AppResult
      .createSuccess<AuthTokensResult>(
        null,
        null,
        resultTokens,
      );
  }
}