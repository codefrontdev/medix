/** @format */

import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { JwtAuthGuard } from "src/app/features/auth/application/guards/jwt-auth.guard";
import { AuthInfoLogoutCommand } from "../../application/commands/logout/auth-info-logout.command";
import { AuthInfoChangePasswordRequest } from "../contracts/request/auth-info-change-password.request";
import { AuthInfoChangePasswordCommand } from "../../application/commands/change-password/auth-info-change-password.command";
import { AuthTokensResponse } from "src/app/features/auth/presentation/contracts/response/auth-tokens.response";
import { UsersGetQuery } from "src/app/features/users/application/queries/get/users-get.query";
import { UsersInfoResponse } from "src/app/features/users/presentation/contracts/response/users-info.response";
import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { AuthInfoUpdateRequest } from "../contracts/request/auth-info-update.request";
import { AuthInfoUpdateCommand } from "../../application/commands/upsert/auth-info-update.command";
import { AppResponse } from "src/app/@core/shared/presentation/contracts/response/app.response";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "web/authInfo",
})
export class AuthInfoController {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get("profile")
  public async profile(
    @Req() req: any
  ): Promise<AppResponse<UsersInfoResponse>> {
    const { userId, roles } = req.user;

    const query = new UsersGetQuery(userId);

    const result = await this.queryBus.execute<
      UsersGetQuery,
      AppResult<UsersInfoResult>
    >(query);

    const response = AppResponse.create<UsersInfoResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      null,
      result.error
    );

    return response;
  }

  @Post("update")
  public async update(
    @Body() authInfoUpdateRequest: AuthInfoUpdateRequest,
    @Req() req: any
  ): Promise<AppResponse<UsersInfoResponse>> {
    const command = new AuthInfoUpdateCommand(
      req.user.userId,
      authInfoUpdateRequest.nickName,
      authInfoUpdateRequest.phoneNumber,
      authInfoUpdateRequest.gender,
      authInfoUpdateRequest.accountType,
      authInfoUpdateRequest.region,
      authInfoUpdateRequest.city,
      authInfoUpdateRequest.address,
      authInfoUpdateRequest.identityType,
      authInfoUpdateRequest.identityNo,
      authInfoUpdateRequest.residenceNo,
      authInfoUpdateRequest.dateOfBirth
    );

    const result = await this.commandBus.execute<
      AuthInfoUpdateCommand,
      AppResult<UsersInfoResult>
    >(command);

    const response = AppResponse.create<UsersInfoResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      null,
      result.error
    );

    return response;
  }

  @Post("changePassword")
  public async changePassword(
    @Body() authInfoChangePasswordRequest: AuthInfoChangePasswordRequest,
    @Req() req: any
  ): Promise<AppResponse<AuthTokensResponse>> {
    const command = new AuthInfoChangePasswordCommand(
      req.user.userId,
      authInfoChangePasswordRequest.oldPassword,
      authInfoChangePasswordRequest.newPassword
    );

    const result = await this.commandBus.execute<
      AuthInfoChangePasswordCommand,
      AppResult<AuthTokensResponse>
    >(command);

    const response = AppResponse.create<AuthTokensResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,

      null,
      result.error
    );

    return response;
  }

  @Post("logout")
  public async logout(@Req() req: any): Promise<AppResponse<null>> {
    const command = new AuthInfoLogoutCommand(req.user.userId);

    const result = await this.commandBus.execute<
      AuthInfoLogoutCommand,
      AppResult<AppResult<null>>
    >(command);

    const response = AppResponse.create<null>(
      result.isSuccess,
      result.key,
      result.message,
      null,
      result.paging,
      result.error
    );

    return response;
  }
}
