import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthError } from "../../../domain/errors/auth-error";

import { AuthForgotPasswordCommand } from "./auth-forgot-password.command";
import { AuthSentCodeResult } from "../../results/auth-sent-code.result";
import { SentCodeEnum } from "../../../@core/values/enums/sent-code.enum";
import { UserCodeFactory } from "../../factories/user-code.factory";
import { SentCodeProviderService } from "../../services/sent-code-provider.service";
import { AppMailService } from "src/app/@core/shared/infrastructure/services/mail/app-mail.service";
import appUrls from "src/app/@core/values/app-urls";
import emailTemplates from "src/app/@core/values/email-templates";
import { AppConfigsService } from "src/app/@core/configs/app-configs.service";


@CommandHandler(AuthForgotPasswordCommand)
export class AuthForgotPasswordHandler
  implements ICommandHandler<AuthForgotPasswordCommand, AppResult<AuthSentCodeResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userCodeFactory: UserCodeFactory,
    private readonly sentCodeProviderService: SentCodeProviderService,
    private readonly appMailService: AppMailService,
    private readonly appConfigsService: AppConfigsService,
  ) { }

  public async execute(
    command: AuthForgotPasswordCommand,
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

    const resetPasswordCode =
      await this
        .userCodeFactory
        .save(
          SentCodeEnum.resetPassword,
          foundUser.email,
          foundUser._id,
        );

    const isEmailSent =
      await this
        .appMailService
        .send(
          foundUser.email,
          SentCodeEnum.resetPassword.title,
          emailTemplates.resetPassword,
          {
            name: foundUser.nickName,
            code: resetPasswordCode.code,
            url: appUrls.auth.resetPassword + resetPasswordCode.code,
          },
        );

    if (!isEmailSent) {
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
          this.appConfigsService.isProduction ? null : resetPasswordCode.code,
          obfuscatedSentTo,
          resetPasswordCode.expirationDate.getTime(),
        );

    return AppResult
      .createSuccess<AuthSentCodeResult>(
        null,
        null,
        resultData,
      );
  }
}