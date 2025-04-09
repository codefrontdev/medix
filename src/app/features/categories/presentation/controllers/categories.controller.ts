
import { Controller, Post, Body, UseGuards, Req, UploadedFile, NotFoundException, UseInterceptors, UploadedFiles, Query, Delete, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { CategoriesUpsertCommand } from '../../application/commands/upsert/categories-upsert.command';
import { CategoriesUpsertRequest } from '../contracts/request/categories-upsert.request';
import { CategoriesGetResponse } from '../contracts/response/categories-get.response';
import { CategoriesGetResult } from '../../application/results/categories-get.result';
import { CategoriesDeleteRequest } from '../contracts/request/categories-delete.request';
import { CategoriesDeleteCommand } from '../../application/commands/delete/categories-delete.command';
import { CategoriesGetQuery } from '../../application/queries/get/categories-get.query';
import { CategoriesGetRequest } from '../contracts/request/categories-get.request';
import { CategoriesGetAllRequest } from '../contracts/request/categories-get-all.request';
import { CategoriesGetAllResponse } from '../contracts/response/categories-get-all.response';
import { CategoriesGetAllQuery } from '../../application/queries/getAll/categories-get-all.query';
import { RolesGuard } from 'src/app/features/auth/application/guards/roles.guard';
import { Roles } from 'src/app/features/auth/application/decorators/roles.decorator';
import { RoleEnum } from 'src/app/features/auth/@core/values/enums/role.enum';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';
import { CategoriesGetAllResult } from '../../application/results/categories-get-all.result';

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller(
  {
    path: 'web/categories',
  },
)
export class CategoriesController {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  @Roles(
    RoleEnum.ADMIN,
  )
  @Post('upsert')
  public async upsert(
    @Body() usersUpsertRequest: CategoriesUpsertRequest,
  ): Promise<AppResponse<CategoriesGetResponse>> {
    const command =
      new CategoriesUpsertCommand(
        usersUpsertRequest.id,
        usersUpsertRequest.name,
        usersUpsertRequest.TagName,
        usersUpsertRequest.parentId,
        usersUpsertRequest.displayOrder,
      );

    const result =
      await this
        .commandBus
        .execute<CategoriesUpsertCommand, AppResult<CategoriesGetResult>>(
          command,
        );

    const response =
      AppResponse
        .create<CategoriesGetResponse>(
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
  @Delete('delete')
  public async delete(
    @Query() categoriesDeleteRequest: CategoriesDeleteRequest,
  ): Promise<AppResponse<null>> {
    const command =
      new CategoriesDeleteCommand(
        categoriesDeleteRequest.id,
      );

    const result =
      await this
        .commandBus
        .execute<CategoriesDeleteCommand, AppResult<null>>(
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
    @Query() categoriesGetRequest: CategoriesGetRequest,
  ): Promise<AppResponse<CategoriesGetResponse>> {
    const query =
      new CategoriesGetQuery(
        categoriesGetRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<CategoriesGetQuery, AppResult<CategoriesGetResult>>(
          query,
        );

    const response =
      AppResponse
        .create<CategoriesGetResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

  @Get('getAll')
  public async getAll(
    @Query() categoriesGetAllRequest: CategoriesGetAllRequest,
  ): Promise<AppResponse<Array<CategoriesGetAllResponse>>> {
    const query =
      new CategoriesGetAllQuery(
        categoriesGetAllRequest.pageSize,
        categoriesGetAllRequest.pageNumber,
        categoriesGetAllRequest.withPaging,
        categoriesGetAllRequest.search,
        categoriesGetAllRequest.parentId,
      );

    const result =
      await this
        .queryBus
        .execute<CategoriesGetAllQuery, AppResult<Array<CategoriesGetAllResult>>>(
          query,
        );

    const response =
      AppResponse
        .create<Array<CategoriesGetAllResponse>>(
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