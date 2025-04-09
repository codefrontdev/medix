import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthDataResult } from "../../results/auth-data.result";
import { AuthError } from "../../../domain/errors/auth-error";

import * as bcrypt from 'bcryptjs';
import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { AuthTokensResult } from "../../results/auth-tokens.result";
import { UserTokenFactory } from "../../factories/user-token.factory";
import { AuthLoginCommand } from "./auth-login.command";


@CommandHandler(AuthLoginCommand)
export class AuthLoginHandler
  implements ICommandHandler<AuthLoginCommand, AppResult<AuthDataResult>> {
  public constructor(
    private readonly userTokenFactory: UserTokenFactory,
    private readonly usersRepository: UsersRepository,
  ) { }

  public async execute(
    command: AuthLoginCommand,
  ): Promise<AppResult<AuthDataResult>> {
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

    if (!foundUser.isEmailConfirmed) {
      return AppResult
        .createError(
          AuthError.emailNotConfirmed,
        );
    }

    const isPasswordCorrect =
      await bcrypt
        .compare(
          command.password,
          foundUser.password,
        );

    if (!isPasswordCorrect) {
      return AppResult
        .createError(
          AuthError.passwordIncorrect,
        );
    }

    const userToken =
      await this.userTokenFactory
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
              foundUser.isVerified,
            ),
          AuthTokensResult
            .create(
              userToken.accessToken,
              userToken.refreshToken,
            ),
        );

    return AppResult
      .createSuccess<AuthDataResult>(
        null,
        null,
        resultData,
      );
  }
}