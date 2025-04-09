import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";

import { UsersRepository } from "../../../persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { UsersGetQuery } from "./users-get.query";
import { UsersGetResult } from "../../results/users-get.result";


@QueryHandler(UsersGetQuery)
export class UsersGetHandler
  implements ICommandHandler<UsersGetQuery, AppResult<UsersGetResult>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async execute(
    query: UsersGetQuery,
  ): Promise<AppResult<UsersGetResult>> {
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