import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthError } from "../../../domain/errors/auth-error";

import { AuthConfirmCommand } from "./auth-confirm.command";
import { SentCodeEnum } from "../../../@core/values/enums/sent-code.enum";
import { AuthTokensResult } from "../../results/auth-tokens.result";
import { UserCodesRepository } from "../../../persistence/repositories/user-codes.repository";
import { AuthService } from "../../services/auth.service";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AuthDataResult } from "../../results/auth-data.result";
import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { UserTokenFactory } from "../../factories/user-token.factory";

@CommandHandler(AuthConfirmCommand)
export class AuthConfirmHandler
  implements ICommandHandler<AuthConfirmCommand, AppResult<AuthDataResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userCodesRepository: UserCodesRepository,
    private readonly userTokenFactory: UserTokenFactory,
  ) { }

  public async execute(
    command: AuthConfirmCommand,
  ): Promise<AppResult<AuthDataResult>> {
    const foundUser =
      await this
        .usersRepository
        .getByEmail(
          command.email,
        );

    if (foundUser.isEmailConfirmed) {
      return AppResult
        .createError(
          AuthError.emailAlreadyConfirmed,
        );
    }

    const foundUserCode =
      await this
        .userCodesRepository
        .checkIfExists(
          command.email,
          command.code,
          SentCodeEnum.emailConfirmation.type,
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

    foundUser.isEmailConfirmed = true;

    await this
      .usersRepository
      .getAndReplaceById(
        foundUser._id,
        foundUser,
      );

    await this
      .userCodesRepository
      .deleteById(
        foundUserCode._id,
      );

    const userToken =
      await this
        .userTokenFactory
        .save(
          foundUser._id,
        );

    const resultData =
      AuthDataResult
        .create(
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
              true,
            ),
          AuthTokensResult
            .create(
              userToken.accessToken,
              userToken.refreshToken,
            ),
        );
//foundUser.isVerified
    return AppResult
      .createSuccess<AuthDataResult>(
        null,
        null,
        resultData,
      );
  }
}