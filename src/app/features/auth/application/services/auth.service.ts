import { Injectable } from '@nestjs/common';
import { AuthTokensResult } from '../results/auth-tokens.result';
import { UserTokenFactory } from '../factories/user-token.factory';
import { UsersRepository } from 'src/app/features/users/persistence/repositories/users.repository';
import { User } from 'src/app/features/users/domain/entities/user';
import * as bcrypt from 'bcryptjs';
import { UserCodeFactory } from '../factories/user-code.factory';
import { AppMailService } from 'src/app/@core/shared/infrastructure/services/mail/app-mail.service';
import { SentCodeEnum } from '../../@core/values/enums/sent-code.enum';
import emailTemplates from 'src/app/@core/values/email-templates';
import appUrls from 'src/app/@core/values/app-urls';
import { UserCode } from '../../domain/entities/user-code';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userTokenFactory: UserTokenFactory,
    private readonly userCodeFactory: UserCodeFactory,
    private readonly appMailService: AppMailService,
  ) { }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<any> {
    if (username === 'admin@example.com' && password === '1234') {
      return {
        id: 1,
        nickname: 'Admin NickName',
      };
    }

    return null;
  }

  public async changePassword(
    user: User,
    newPassword: string,
  ): Promise<AuthTokensResult> {
    const salt =
      await bcrypt
        .genSalt();

    const hashedNewPassword =
      await bcrypt
        .hash(
          newPassword,
          salt,
        );

    user.password = hashedNewPassword;

    await this
      .usersRepository
      .getAndReplaceById(
        user._id,
        user,
      );

    const userToken =
      await this
        .userTokenFactory
        .save(
          user._id,
        );

    const resultTokens =
      AuthTokensResult
        .create(
          userToken.accessToken,
          userToken.refreshToken,
        );

    return resultTokens;
  }

  public async createAndSendConfirmCode(
    user: User,
  ): Promise<UserCode | null> {
    const confirmCode =
      await this
        .userCodeFactory
        .save(
          SentCodeEnum.emailConfirmation,
          user.email,
          user._id,
        );

    const isEmailSent =
      await this
        .appMailService
        .send(
          user.email,
          SentCodeEnum.emailConfirmation.title,
          emailTemplates.confirm,
          {
            name: user.nickName,
            code: confirmCode.code,
            url: appUrls.auth.confirm + confirmCode.code,
          },
        );

    return isEmailSent ? confirmCode : null;
  }
}
