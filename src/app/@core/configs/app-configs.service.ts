import { ConfigService } from '@nestjs/config';
import { AppConfig } from './interfaces/app.config';
import { AppDatabaseConfig } from './interfaces/app-database.config';
import { AppJwtConfig } from './interfaces/app-jwt.config';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import Joi from 'joi';
import { AppSentCodeConfig } from './interfaces/app-sent-code.config';
import { AppMailConfig } from './interfaces/app-mail.config';
import { EnvEnum } from './values/enums/env.enum';
import { envConstants } from './values/env-constants';

@Injectable()
export class AppConfigsService {
  public constructor(
    private configService: ConfigService,
  ) { }

  public get appConfig(): AppConfig {
    return {
      name: this.configService.get<string>('APP_NAME'),
      port: this.configService.get<number>('APP_PORT'),
      environment: this.configService.get<string>('NODE_ENV'),
    };
  }

  public get isProduction(): boolean {
    return this.appConfig.environment === EnvEnum.PRODUCTION;
  }

  public get databaseConfig(): AppDatabaseConfig {
    return {
      uri: this.configService.get<string>('DB_URI'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
    };
  }

  public get jwtConfig(): AppJwtConfig {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      refreshExpiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    };
  }

  public get sentCodeConfig(): AppSentCodeConfig {
    return {
      expiresIn: this.configService.get<string>('SENT_CODE_EXPIRES_IN'),
    };
  }

  public get mailConfig(): AppMailConfig {
    return {
      templates: this.configService.get<string>('EMAIL_TEMPLATES'),
      sender: this.configService.get<string>('EMAIL_SENDER'),
      password: this.configService.get<string>('EMAIL_PASSWORD'),
      smtpServer: this.configService.get<string>('EMAIL_SMTP_SERVER'),
      smtpPort: this.configService.get<number>('EMAIL_SMTP_PORT'),
      isSecured: this.configService.get<boolean>('EMAIL_SECURE'),
    };
  }

  public static validateConfig(
    envConfig: Record<string, unknown>,
  ): Record<string, unknown> {
    const envVarsSchema: Joi.ObjectSchema =
      Joi
        .object(
          {
            APP_NAME: Joi.string().default('Medex'),
            APP_PORT: Joi.number().default(3000),
            NODE_ENV:
              Joi
                .string()
                .valid(
                  EnvEnum.DEVELOPMENT,
                  EnvEnum.STAGING,
                  EnvEnum.PRODUCTION,
                )
                .default(
                  envConstants.defaultEnv,
                ),

            DB_URI: Joi.string().required(),
            DB_USERNAME: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_DATABASE: Joi.string().required(),

            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRES_IN: Joi.string().default('60m'),
            JWT_REFRESH_EXPIRES_IN: Joi.string().default('3d'),

            SENT_CODE_EXPIRES_IN: Joi.string().default('5m'),

            EMAIL_TEMPLATES: Joi.string().default('resources/email-templates'),
            EMAIL_SENDER: Joi.string().default(''),
            EMAIL_PASSWORD: Joi.string().default(''),
            EMAIL_SMTP_SERVER: Joi.string().default(''),
            EMAIL_SMTP_PORT: Joi.number().default(465),
            EMAIL_SECURE: Joi.boolean().default(true),
          }
        );

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(
        envConfig,
        {
          allowUnknown: false,
          abortEarly: true,
        },
      );

    if (error) {
      throw new Error(
        `Config validation error: ${error.message}`,
      );
    }

    return validatedEnvConfig;
  }
}
