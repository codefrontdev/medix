import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppLoggerService } from './app/@core/logger/app-logger.service';
import { AppConfigsService } from './app/@core/configs/app-configs.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigsModule } from './app/@core/configs/app-configs.module';
import { AppThrottlerModule } from './app/@core/throttler/app-throttler.module';
import { AuthModule } from './app/features/auth/auth.module';
import { AuthInfoModule } from './app/features/auth-info/auth-info.module';
import { UsersModule } from './app/features/users/users.module';
import { MediasModule } from './app/features/medias/medias.module';
import { CategoriesModule } from './app/features/categories/categories.module';
import { DatabaseModule } from './app/@core/shared/persistence/database.module';
import { UtilsModule } from './app/@core/utils/utils.module';
import { CompaniesModule } from './app/features/companies/companies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { mediasConstants } from './app/features/medias/domain/constants/medias-constants';
import { getPublicDirectory } from './app/@core/utils/functions/miedas-functions';
import { ProtectedFilesMiddleware } from './app/@core/middlewares/protected-files.middleware';
import { AppLoggerModule } from './app/@core/logger/app-logger.module';
import { RequestsLoggerMiddleware } from './app/@core/middlewares/requests-logger.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import * as express from 'express';
import { TendersModule } from './app/features/tenders/tenders.module';
import { OrdersModule } from './app/features/orders/orders.module';
import { ItemsModule } from './app/features/items/items.module';
import { HelpModule } from './app/features/help/help.module';
import { NotificationModule } from './app/features/notifications/notification.module';
import { UserModule } from './app/features/users/user.module';
import { TransformsModule } from './app/features/transformation/transforms.module';
import { PaymentModule } from './app/features/payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
// import { HelpModule } from './app/features/help/help.module'; // Ensure the correct path or create the module if it does not exist


@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: getPublicDirectory(),
        serveRoot: `/${mediasConstants.paths.public}`,
      },
    ),

    AppLoggerModule,
    AuthModule.prepareJwtModule(),
    AppConfigsModule,
    AppThrottlerModule,
    DatabaseModule,
    UtilsModule,
    // Features
    AuthModule,
    AuthInfoModule,
    UsersModule,
    CategoriesModule,
    CompaniesModule,
    OrdersModule,
    MediasModule,
    ItemsModule,
    TendersModule,
    HelpModule, // Ensure the correct path or create the module if it does not exist
    PaymentModule,
    NotificationModule,
    UserModule,
    TransformsModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get("EMAIL_SMTP_SERVER"),
          port: parseInt(configService.get("EMAIL_SMTP_PORT"), 10),
          secure: configService.get("EMAIL_SECURE") === "true", 
          auth: {
            user: configService.get("EMAIL_SENDER"),
            pass: configService.get("EMAIL_PASSWORD"),
          },
        },
        defaults: {
          from: configService.get("EMAIL_SENDER"),
        },
        template: {
          dir: configService.get("EMAIL_TEMPLATES"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppConfigsService,
    AppLoggerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    RequestsLoggerMiddleware,
    ProtectedFilesMiddleware,
  ],
  exports: [AppConfigsService, AppLoggerService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    // consumer
    //   .apply(
    //     RequestsLoggerMiddleware,
    //   )
    //   .forRoutes(
    //     '*',
    //   );
    // consumer
    //   .apply(
    //     ProtectedFilesMiddleware,
    //   )
    //   .forRoutes(
    //     {
    //       path: `${mediasConstants.paths.publicUploadsProtected}/*`,
    //       method: RequestMethod.GET,
    //     }
    //   );
  }
}
