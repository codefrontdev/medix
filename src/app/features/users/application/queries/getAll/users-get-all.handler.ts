import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { UsersRepository } from "../../../persistence/repositories/users.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { UsersGetAllQuery } from "./users-get-all.query";
import { UsersGetAllResult } from "../../results/users-get-all.result";
import { FilterQuery } from "mongoose";
import { User } from "../../../domain/entities/user";
import { searchRegEx } from "src/app/@core/utils/functions/reg-ex-functions";
import { OrderDirectionEnum } from "src/app/@core/values/enums/order-direction.enum";
import { OrderByEnum } from "src/app/@core/values/enums/order-by.enum";


@QueryHandler(UsersGetAllQuery)
export class UsersGetAllHandler
  implements IQueryHandler<UsersGetAllQuery, AppResult<Array<UsersGetAllResult>>> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async execute(
    query: UsersGetAllQuery,
  ): Promise<AppResult<Array<UsersGetAllResult>>> {
    const filter: FilterQuery<User> = {};

    if (query.search !== null) {
      filter.$or = [
        {
          nickName:
            searchRegEx(
              query.search
            ),
          email:
            searchRegEx(
              query.search
            ),
          phoneNumber:
            searchRegEx(
              query.search
            ),
        },
      ];
    }

    if (query.role != null && query.role !== 'null') {
      filter.role = query.role;
    }


    const result =
      await this
        .usersRepository
        .getAllAsResult(
          filter,
          {},
          null,
          query.pageSize,
          query.pageNumber,
          query.withPaging,
          [
            {
              field: OrderByEnum.NICK_NAME,
              direction: OrderDirectionEnum.ASC,
            },
          ]
        );

    const entitiesResults =
      result
        .data
        .map(
          (element) => {
            return UsersGetAllResult
              .create(
                element._id,
                element.nickName,
                element.email,
                element.phoneNumber,
                element.role,
                element.gender,
                element.isVerified,
              );
          }
        );

    return AppResult
      .createSuccess<Array<UsersGetAllResult>>(
        null,
        null,
        entitiesResults,
        result.paging,
      );
  }
}