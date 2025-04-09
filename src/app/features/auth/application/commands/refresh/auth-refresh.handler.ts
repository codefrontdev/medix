import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthError } from "../../../domain/errors/auth-error";

import { AuthTokensResult } from "../../results/auth-tokens.result";
import { UserTokensRepository } from "../../../persistence/repositories/user-tokens.repository";
import { JwtProviderService } from "../../services/jwt-provider.service";
import { UserToken } from "../../../domain/entities/user-token";
import { AuthRefreshCommand } from "./auth-refresh.command";


@CommandHandler(AuthRefreshCommand)
export class AuthRefreshHandler
  implements ICommandHandler<AuthRefreshCommand, AppResult<AuthTokensResult>> {
  public constructor(
    private readonly userTokensRepository: UserTokensRepository,
    private readonly jwtProviderService: JwtProviderService,
  ) { }

  public async execute(
    command: AuthRefreshCommand,
  ): Promise<AppResult<AuthTokensResult>> {
    const foundUserToken =
      await this
        .userTokensRepository
        .getByRefreshToken(
          command.refreshToken
        );

    if (foundUserToken === null) {
      return AppResult
        .createError(
          AuthError.invalidRefreshToken,
        );
    }

    const expirationCondition = foundUserToken.expirationDate < new Date();
    if (expirationCondition) {
      return AppResult
        .createError(
          AuthError.refreshTokenExpired,
        );
    }

    const accessToken =
      await this
        .jwtProviderService
        .generateAccessToken(
          foundUserToken.userId,
        );

    const userToken =
      await this
        .userTokensRepository
        .getAndReplaceById(
          foundUserToken._id,
          new UserToken(
            foundUserToken._id,
            accessToken,
            foundUserToken.refreshToken,
            foundUserToken.userId,
            foundUserToken.expirationDate,
          ),
        );

    const resultTokens =
      AuthTokensResult
        .create(
          userToken.accessToken,
          userToken.refreshToken,
        );

    return AppResult
      .createSuccess<AuthTokensResult>(
        null,
        null,
        resultTokens,
      );
  }
}