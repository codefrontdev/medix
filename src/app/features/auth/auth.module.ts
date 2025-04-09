import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AppConfigsService } from 'src/app/@core/configs/app-configs.service';
import { AppConfigsModule } from 'src/app/@core/configs/app-configs.module';
import { JwtAuthStrategy } from './application/strategies/jwt-auth.strategy';
import { AuthController } from './presentation/controllers/auth.controller';
import { LocalAuthStrategy } from './application/strategies/local-auth.strategy';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRegisterHandler } from './application/commands/register/auth-register.handler';
import { AuthLoginHandler } from './application/commands/login/auth-login.handler';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserTokenSchema } from './persistence/schemas/user-token.schema';
import { UserTokenFactory } from './application/factories/user-token.factory';
import { UserTokenSchemaFactory } from './persistence/factories/user-token-schema.factory';
import { UserTokensRepository } from './persistence/repositories/user-tokens.repository';
import { JwtProviderService } from './application/services/jwt-provider.service';
import { AuthRefreshHandler } from './application/commands/refresh/auth-refresh.handler';
import { AuthForgotPasswordHandler } from './application/commands/forgot-password/auth-forgot-password.handler';
import { SentCodeProviderService } from './application/services/sent-code-provider.service';
import { UserCodeSchema } from './persistence/schemas/user-code.schema';
import { UserCodeFactory } from './application/factories/user-code.factory';
import { UserCodeSchemaFactory } from './persistence/factories/user-code-schema.factory';
import { UserCodesRepository } from './persistence/repositories/user-codes.repository';
import { AuthResetPasswordHandler } from './application/commands/reset-password/auth-reset-password.handler';
import { UtilsModule } from 'src/app/@core/utils/utils.module';
import { InfrastructureModule } from 'src/app/@core/shared/infrastructure/infrastructure.module';
import { AuthConfirmHandler } from './application/commands/confirm/auth-confirm.handler';
import { AuthResendConfirmCodeHandler } from './application/commands/resend-confirm-code/auth-resend-confirm-code.handler';
import { GetMeHandler } from './application/commands/getme/auth-get-me-handle';
import { AuthsUpsertHandler } from './application/commands/updateme/auth-update.handler';
import { AuthFactory } from './application/factories/auth.factory';

@Module(
  {
    imports: [
      UsersModule,
      UtilsModule,
      InfrastructureModule,

      CqrsModule,
      MongooseModule.forFeature(
        [
          {
            name: UserTokenSchema.name,
            schema:
              SchemaFactory
                .createForClass(
                  UserTokenSchema,
                ),
          },
          {
            name: UserCodeSchema.name,
            schema:
              SchemaFactory
                .createForClass(
                  UserCodeSchema,
                ),
          },
        ],
      ),
      PassportModule,
      AppConfigsModule,
      AuthModule.prepareJwtModule(),
    ],
    providers: [
      AuthService,
      JwtProviderService,
      SentCodeProviderService,
      LocalAuthStrategy,
      JwtAuthStrategy,
      AuthRegisterHandler,
      AuthLoginHandler,
      AuthsUpsertHandler,
      GetMeHandler,
      AuthRefreshHandler,
      AuthConfirmHandler,
      AuthResendConfirmCodeHandler,
      AuthResetPasswordHandler,
      AuthForgotPasswordHandler,
      UserTokensRepository,
      UserTokenSchemaFactory,
      UserTokenFactory,
      UserCodesRepository,
      UserCodeSchemaFactory,
      UserCodeFactory,
      AuthFactory,
    ],
    controllers: [
      AuthController,
    ],
    exports: [
      AuthService,
      JwtProviderService,
      UserTokensRepository,
      UserTokenFactory,
    ],
  },
)
export class AuthModule {
  public static prepareJwtModule(): DynamicModule {
    return JwtModule
      .registerAsync(
        {
          imports: [
            AppConfigsModule,
          ],
          inject: [
            AppConfigsService,
          ],
          useFactory:
            (
              appConfigsService: AppConfigsService,
            ) => (
              {
                secret: appConfigsService.jwtConfig.secret,
                signOptions: {
                  expiresIn: appConfigsService.jwtConfig.expiresIn,
                },
              }
            ),
        },
      );
  }
}
