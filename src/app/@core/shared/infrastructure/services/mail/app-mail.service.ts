import { Injectable } from '@nestjs/common';
import { AppConfigsService } from 'src/app/@core/configs/app-configs.service';
import { AppLoggerService } from 'src/app/@core/logger/app-logger.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class AppMailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfigsService: AppConfigsService,
    private readonly logger: AppLoggerService,
  ) {
  }

  public async send(
    to: string,
    subject: string,
    template: string,
    context?: any,
  ): Promise<boolean> {
    var isSent = false;

    await this.
      mailerService
      .sendMail(
        {
          from: `"${this.appConfigsService.appConfig.name}" <${this.appConfigsService.mailConfig.sender}>`,
          to: to,
          subject: `${this.appConfigsService.appConfig.name} | ${subject}`,
          template: template,
          context: context,
        },
      )
      .then(
        (sentMessageInfo: SentMessageInfo) => {
          isSent = true;

          this.
            logger
            .log(
              sentMessageInfo.messageId,
            )
        },
      )
      .catch(
        (error) => {
          this.
            logger
            .error(
              error,
              error.stackTrace,
            );
        },
      );

    return isSent;
  }
}
