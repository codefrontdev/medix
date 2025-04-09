/** @format */

import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { AuthService } from "../../application/services/auth.service";
import { AuthLoginRequest } from "../contracts/request/auth-login.request";
import { AuthDataResponse } from "../contracts/response/auth-data.response";
import { AuthRegisterRequest } from "../contracts/request/auth-register.request";
import { AuthRegisterCommand } from "../../application/commands/register/auth-register.command";
import { CommandBus } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthDataResult } from "../../application/results/auth-data.result";
import { AuthRefreshRequest } from "../contracts/request/auth-refresh.request";
import { AuthTokensResponse } from "../contracts/response/auth-tokens.response";
import { AuthTokensResult } from "../../application/results/auth-tokens.result";
import { AuthLoginCommand } from "../../application/commands/login/auth-login.command";
import { AuthRefreshCommand } from "../../application/commands/refresh/auth-refresh.command";
import { AuthForgotPasswordRequest } from "../contracts/request/auth-forgot-password.request";
import { AuthForgotPasswordCommand } from "../../application/commands/forgot-password/auth-forgot-password.command";
import { AuthSentCodeResult } from "../../application/results/auth-sent-code.result";
import { AuthSentCodeResponse } from "../contracts/response/auth-sent-code.response";
import { AuthResetPasswordRequest } from "../contracts/request/auth-reset-password.request";
import { AuthResetPasswordCommand } from "../../application/commands/reset-password/auth-reset-password.command";
import { AuthResendConfirmCodeRequest } from "../contracts/request/auth-resend-confirm-code.request";
import { AuthResendConfirmCodeCommand } from "../../application/commands/resend-confirm-code/auth-resend-confirm-code.command";
import { AuthConfirmRequest } from "../contracts/request/auth-confirm.request";
import { AuthConfirmCommand } from "../../application/commands/confirm/auth-confirm.command";
import { AppResponse } from "src/app/@core/shared/presentation/contracts/response/app.response";
import { JwtAuthGuard } from "../../application/guards/jwt-auth.guard";
import { GetMeCommand } from "../../application/commands/getme/auth-get-me-command";

import { AuthsUpsertRequest } from "../contracts/request/auth-update.request";
import { AuthsGetResponse } from "../contracts/response/auth-update.response";
import { AuthsUpsertCommand } from "../../application/commands/updateme/auth-update.command";
import { UsersGetResult } from "src/app/features/users/application/results/users-get.result";

@Controller({
  path: "web/auth",
})
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus
  ) {}

  @Post("register")
  public async register(
    @Body() authRegisterRequest: AuthRegisterRequest
  ): Promise<AppResponse<AuthSentCodeResponse>> {
    const command = new AuthRegisterCommand(
      authRegisterRequest.nickName,
      authRegisterRequest.email,
      authRegisterRequest.password,
      authRegisterRequest.role
    );

    const result = await this.commandBus.execute<
      AuthRegisterCommand,
      AppResult<AuthSentCodeResult>
    >(command);

    const response = AppResponse.create<AuthSentCodeResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }

  @Post("login")
  public async login(
    @Body() authLoginRequest: AuthLoginRequest
  ): Promise<AppResponse<AuthDataResponse>> {
    const command = new AuthLoginCommand(
      authLoginRequest.email,
      authLoginRequest.password
    );

    const result = await this.commandBus.execute<
      AuthLoginCommand,
      AppResult<AuthDataResult>
    >(command);

    const response = AppResponse.create<AuthDataResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }
  //Jack
  @UseGuards(JwtAuthGuard)
  @Post("upsert")
  public async upsert(
    @Body() usersUpsertRequest: AuthsUpsertRequest
  ): Promise<AppResponse<AuthsGetResponse>> {
    const command = new AuthsUpsertCommand(
      usersUpsertRequest.id,
      usersUpsertRequest.nickName,
      usersUpsertRequest.email,
      String(usersUpsertRequest.phoneNumber),
      usersUpsertRequest.role,
      usersUpsertRequest.gender,
      usersUpsertRequest.accountType,
      usersUpsertRequest.region,
      usersUpsertRequest.city,
      usersUpsertRequest.address,
      usersUpsertRequest.identityType,
      usersUpsertRequest.identityNo,
      usersUpsertRequest.residenceNo,
      usersUpsertRequest.dateOfBirth
    );
    const result = await this.commandBus.execute<
      AuthsUpsertCommand,
      AppResult<UsersGetResult>
    >(command);

    const response = AppResponse.create<AuthsGetResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      null,
      result.error
    );

    return response;
  }
  @UseGuards(JwtAuthGuard)
  @Get("me")
  public async getMe(@Req() req: any): Promise<AppResponse<AuthDataResponse>> {
    const { userId } = req.user;
    const command = new GetMeCommand(userId);
    const result = await this.commandBus.execute<
      GetMeCommand,
      AppResult<AuthDataResult>
    >(command);

    const response = AppResponse.create<AuthDataResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }
  //
  @Post("refresh")
  public async refresh(
    @Body() authRefreshRequest: AuthRefreshRequest
  ): Promise<AppResponse<AuthTokensResponse>> {
    const command = new AuthRefreshCommand(authRefreshRequest.refreshToken);

    const result = await this.commandBus.execute<
      AuthRefreshCommand,
      AppResult<AuthTokensResult>
    >(command);

    const response = AppResponse.create<AuthTokensResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }

  @Post("confirm")
  public async confirm(
    @Body() authConfirmRequest: AuthConfirmRequest
  ): Promise<AppResponse<AuthDataResponse>> {
    const command = new AuthConfirmCommand(
      authConfirmRequest.email,
      authConfirmRequest.code
    );
    const result = await this.commandBus.execute<
      AuthConfirmCommand,
      AppResult<AuthDataResult>
    >(command);

    const response = AppResponse.create<AuthDataResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }

  @Post("resendConfirmCode")
  public async resendConfirmCode(
    @Body() authResendConfirmCodeRequest: AuthResendConfirmCodeRequest
  ): Promise<AppResponse<AuthSentCodeResponse>> {
    const command = new AuthResendConfirmCodeCommand(
      authResendConfirmCodeRequest.email
    );

    const result = await this.commandBus.execute<
      AuthResendConfirmCodeCommand,
      AppResult<AuthSentCodeResult>
    >(command);

    const response = AppResponse.create<AuthSentCodeResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }

  @Post("forgotPassword")
  // @UseGuards(LocalAuthGuard)
  public async forgotPassword(
    @Body() authForgotPasswordRequest: AuthForgotPasswordRequest
  ): Promise<AppResponse<AuthSentCodeResponse>> {
    const command = new AuthForgotPasswordCommand(
      authForgotPasswordRequest.email
    );

    const result = await this.commandBus.execute<
      AuthForgotPasswordCommand,
      AppResult<AuthSentCodeResult>
    >(command);

    const response = AppResponse.create<AuthSentCodeResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }

  @Post("resetPassword")
  // @UseGuards(LocalAuthGuard)
  public async resetPassword(
    @Body() authResetPasswordRequest: AuthResetPasswordRequest
  ): Promise<AppResponse<AuthTokensResponse>> {
    const command = new AuthResetPasswordCommand(
      authResetPasswordRequest.email,
      authResetPasswordRequest.code,
      authResetPasswordRequest.newPassword
    );

    const result = await this.commandBus.execute<
      AuthResetPasswordCommand,
      AppResult<AuthTokensResult>
    >(command);

    const response = AppResponse.create<AuthTokensResponse>(
      result.isSuccess,
      result.key,
      result.message,
      result.data,
      result.paging,
      result.error
    );

    return response;
  }
}
