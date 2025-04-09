import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthError } from "../../../domain/errors/auth-error";

import { AuthSentCodeResult } from "../../results/auth-sent-code.result";
import { SentCodeProviderService } from "../../services/sent-code-provider.service";
import { AppConfigsService } from "src/app/@core/configs/app-configs.service";
import { AuthResendConfirmCodeCommand } from "./auth-resend-confirm-code.command";
import { AuthService } from "../../services/auth.service";
import { join } from "path";


@CommandHandler(AuthResendConfirmCodeCommand)
export class AuthResendConfirmCodeHandler
  implements ICommandHandler<AuthResendConfirmCodeCommand, AppResult<AuthSentCodeResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sentCodeProviderService: SentCodeProviderService,
    private readonly appConfigsService: AppConfigsService,
    private readonly authService: AuthService,
  ) { }

  public async execute(
    command: AuthResendConfirmCodeCommand,
  ): Promise<AppResult<AuthSentCodeResult>> {
    const foundUser =
      await this
        .usersRepository
        .getByEmail(
          command.email
        );

    if (foundUser === null) {
      return AppResult
        .createError(
          AuthError
            .emailOrPhoneNotExist(
              true,
            ),
        );
    }

    if (foundUser.isEmailConfirmed) {
      return AppResult
        .createError(
          AuthError.emailAlreadyConfirmed,
        );
    }

    const confirmCode =
      await this
        .authService
        .createAndSendConfirmCode(
          foundUser,
        );

    if (confirmCode === null) {
      return AppResult
        .createError(
          AuthError.errorWhileSendingEmail,
        );
    }

    const obfuscatedSentTo =
      this
        .sentCodeProviderService
        .obfuscateSentTo(
          foundUser.email,
        );

    const resultData =
      AuthSentCodeResult
        .create(
          this.appConfigsService.isProduction ? null : confirmCode.code,
          obfuscatedSentTo,
          confirmCode.expirationDate.getTime(),
        );

    return AppResult
      .createSuccess<AuthSentCodeResult>(
        null,
        null,
        resultData,
      );
  }
}