import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthInfoLogoutHandler } from './application/commands/logout/auth-info-logout.handler';
import { AuthInfoController } from './presentation/controllers/auth-info.controller';
import { AuthInfoChangePasswordHandler } from './application/commands/change-password/auth-info-change-password.handler';
import { UsersModule } from '../users/users.module';
import { AuthInfoProfileHandler } from './application/queries/profile/auth-info-profile.handler';
import { AuthInfoUpdateHandler } from './application/commands/upsert/auth-info-update.handler';

@Module(
  {
    imports: [
      AuthModule,
      UsersModule,

      CqrsModule,
    ],
    providers: [
      AuthInfoProfileHandler,
      AuthInfoUpdateHandler,
      AuthInfoChangePasswordHandler,
      AuthInfoLogoutHandler,
    ],
    controllers: [
      AuthInfoController,
    ],
    exports: [
    ],
  },
)
export class AuthInfoModule { }
