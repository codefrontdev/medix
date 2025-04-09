import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthRegisterCommand } from "./auth-register.command";
import { UserFactory } from "src/app/features/users/application/factories/user.factory";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AuthError } from "../../../domain/errors/auth-error";
import { AuthService } from "../../services/auth.service";
import { AuthSentCodeResult } from "../../results/auth-sent-code.result";
import { AppConfigsService } from "src/app/@core/configs/app-configs.service";
import { SentCodeProviderService } from "../../services/sent-code-provider.service";
import { GenderEnum } from "src/app/@core/values/enums/gender.enum";
import { RoleEnum } from "../../../@core/values/enums/role.enum";

@CommandHandler(AuthRegisterCommand)
export class AuthRegisterHandler
  implements ICommandHandler<AuthRegisterCommand, AppResult<AuthSentCodeResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userFactory: UserFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly authService: AuthService,
    private readonly appConfigsService: AppConfigsService,
    private readonly sentCodeProviderService: SentCodeProviderService,
  ) { }

  public async execute(
    command: AuthRegisterCommand,
  ): Promise<AppResult<AuthSentCodeResult>> {
    const foundUser =
      await this
        .usersRepository
        .getByEmail(
          command.email,
        );

    if (foundUser !== null) {
      return AppResult
        .createError(
          AuthError.emailTaken,
        );
    }

    const user =
      await this
        .userFactory
        .save(
          null,
          command.nickName,
          command.email,
          '', // Will be updated later
          command.password,
          command.role, // TODO: command.role,
          GenderEnum.MALE,
          null,
          null,
          null,
          null,
          null,
          null,
          null, // residenceNo
          null, // dateOfBirth
        );

    const confirmCode =
      await this
        .authService
        .createAndSendConfirmCode(
          user,
        );

    if (confirmCode === null) {
      return AppResult
        .createError(
          AuthError.errorWhileSendingEmail,
        );
    }

    this
      .eventPublisher
      .mergeObjectContext(
        user,
      );

    user
      .commit();

    const obfuscatedSentTo =
      this
        .sentCodeProviderService
        .obfuscateSentTo(
          user.email,
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