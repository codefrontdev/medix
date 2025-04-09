import { Module } from '@nestjs/common';
import { AppConfigsModule } from '../../configs/app-configs.module';
import { AppLoggerModule } from '../../logger/app-logger.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { AppConfigsService } from '../../configs/app-configs.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AppMailService } from './services/mail/app-mail.service';
import { AppFilesService } from './services/files/app-files.service';

@Module(
  {
    imports: [
      AppConfigsModule,
      AppLoggerModule,

      MailerModule.forRootAsync(
        {
          imports: [
            AppConfigsModule,
          ],
          inject: [
            AppConfigsService,
          ],
          useFactory: async (appConfigsService: AppConfigsService) => {
            return (
              {
                transport: {
                  host: appConfigsService.mailConfig.smtpServer,
                  port: appConfigsService.mailConfig.smtpPort,
                  secure: appConfigsService.mailConfig.isSecured,
                  auth: {
                    user: appConfigsService.mailConfig.sender,
                    pass: appConfigsService.mailConfig.password,
                  },
                },
                defaults: {
                  from: `"${appConfigsService.appConfig.name}" <${appConfigsService.mailConfig.sender}>`,
                },
                template: {
                  dir:
                    join
                      (
                        __dirname,
                        appConfigsService.mailConfig.templates,
                      ),
                  adapter: new EjsAdapter(),
                  options: {
                    strict: false,
                  },
                },
              }
            );
          },
        },
      ),
    ],
    providers: [
      AppMailService,
      AppFilesService,
    ],
    controllers: [
    ],
    exports: [
      AppMailService,
      AppFilesService,
    ],
  },
)
export class InfrastructureModule { }
