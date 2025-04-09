
import { Controller, Post, Body, UseGuards, Req, Query, Get, Delete, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { UsersUpsertCommand } from '../../application/commands/upsert/users-upsert.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersUpsertRequest } from '../contracts/request/users-upsert.request';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { UsersGetRequest } from '../contracts/request/users-get.request';
import { UsersGetResponse } from '../contracts/response/users-get.response';
import { UsersGetQuery } from '../../application/queries/get/users-get.query';
import { UsersGetResult } from '../../application/results/users-get.result';
import { UsersGetAllResponse } from '../contracts/response/users-get-all.response';
import { UsersGetAllQuery } from '../../application/queries/getAll/users-get-all.query';
import { UsersGetAllRequest } from '../contracts/request/users-get-all.request';
import { UsersDeleteRequest } from '../contracts/request/users-delete.request';
import { UsersDeleteCommand } from '../../application/commands/delete/users-delete.command';
import { UsersVerifyRequest } from '../contracts/request/users-verify.request';
import { UsersVerifyCommand } from '../../application/commands/verify/users-verify.command';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { Roles } from 'src/app/features/auth/application/decorators/roles.decorator';
import { RoleEnum } from 'src/app/features/auth/@core/values/enums/role.enum';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller(
  {
    path: 'web/users',
  },
)
export class UsersController {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  @Roles(
    RoleEnum.ADMIN,
  )
  @Post('upsert')
  public async upsert(
    @Body() usersUpsertRequest: UsersUpsertRequest,
  ): Promise<AppResponse<UsersGetResponse>> {
    const command =
      new UsersUpsertCommand(
        usersUpsertRequest.id,
        usersUpsertRequest.nickName,
        usersUpsertRequest.email,
        usersUpsertRequest.phoneNumber,
        usersUpsertRequest.role,
        usersUpsertRequest.gender,
        usersUpsertRequest.accountType,
        usersUpsertRequest.region,
        usersUpsertRequest.city,
        usersUpsertRequest.address,
        usersUpsertRequest.identityType,
        usersUpsertRequest.identityNo,
        usersUpsertRequest.residenceNo,
        usersUpsertRequest.dateOfBirth,
      );

    const result =
      await this
        .commandBus
        .execute<UsersUpsertCommand, AppResult<UsersGetResult>>(
          command,
        );

    const response =
      AppResponse
        .create<UsersGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

  @Roles(
    RoleEnum.ADMIN,
  )
  @Post('verify')
  public async verify(
    @Body() usersVerifyRequest: UsersVerifyRequest,
  ): Promise<AppResponse<null>> {
    const command =
      new UsersVerifyCommand(
        usersVerifyRequest.id,
        usersVerifyRequest.isVerified,
      );

    const result =
      await this
        .commandBus
        .execute<UsersVerifyCommand, AppResult<null>>(
          command,
        );

    const response =
      AppResponse
        .create<null>(
          result.isSuccess,
          result.key,
          result.message,
          null,
          null,
          result.error,
        );

    return response;
  }

  @Roles(
    RoleEnum.ADMIN,
  )
  @Delete('delete')
  public async delete(
    @Query() usersDeleteRequest: UsersDeleteRequest,
  ): Promise<AppResponse<null>> {
    const command =
      new UsersDeleteCommand(
        usersDeleteRequest.id,
      );

    const result =
      await this
        .commandBus
        .execute<UsersDeleteCommand, AppResult<null>>(
          command,
        );

    const response =
      AppResponse
        .create<null>(
          result.isSuccess,
          result.key,
          result.message,
          null,
          null,
          result.error,
        );

    return response;
  }

  @Get('get')
  public async get(
    @Query() usersGetRequest: UsersGetRequest,
    @Req() req: any,
  ): Promise<AppResponse<UsersGetResponse>> {
    const { userId, roles } = req.user;
    const isAdmin =
      roles
        .includes(
          RoleEnum.ADMIN,
        );

    if (!isAdmin && userId != usersGetRequest.id) {
      throw new ForbiddenException();
    }

    const query =
      new UsersGetQuery(
        usersGetRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<UsersGetQuery, AppResult<UsersGetResult>>(
          query,
        );

    const response =
      AppResponse
        .create<UsersGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

  @Roles(
    RoleEnum.ADMIN,
  )
  @Get('getAll')
  public async getAll(
    @Query() usersGetAllRequest: UsersGetAllRequest,
  ): Promise<AppResponse<Array<UsersGetAllResponse>>> {
    const query =
      new UsersGetAllQuery(
        usersGetAllRequest.pageSize,
        usersGetAllRequest.pageNumber,
        usersGetAllRequest.withPaging,
        usersGetAllRequest.search,
        usersGetAllRequest.role,
      );

    const result =
      await this
        .queryBus
        .execute<UsersGetAllQuery, AppResult<Array<UsersGetAllResponse>>>(
          query,
        );

    const response =
      AppResponse
        .create<Array<UsersGetAllResponse>>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          result.paging,
          result.error,
        );

    return response;
  }
}