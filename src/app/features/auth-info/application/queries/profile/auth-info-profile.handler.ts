import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { AuthInfoProfileQuery } from "./auth-info-profile.query";
import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { UsersRepository } from "src/app/features/users/persistence/repositories/users.repository";


@QueryHandler(AuthInfoProfileQuery)
export class AuthInfoProfileHandler
  implements IQueryHandler<AuthInfoProfileQuery, AppResult<UsersInfoResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async execute(
    query: AuthInfoProfileQuery,
  ): Promise<AppResult<UsersInfoResult>> {
    const entity =
      await this
        .usersRepository
        .getById(
          query.id,
        );

    if (entity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'object',
            ),
        );
    }

    const resultData =
      UsersInfoResult
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
      .createSuccess<UsersInfoResult>(
        null,
        null,
        resultData,
      );
  }
}