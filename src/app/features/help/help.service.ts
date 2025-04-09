import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class HelpService {
  constructor(private readonly mailerService: MailerService) {}

  async sendHelpRequest(question: string, attachment: any, userName: string, userEmail: string) {
    const mailOptions: any = {
      to: 'deemsulaman8@gmail.com',
      subject: 'Help Request',
      template: 'help-request.ejs', // Updated template path to .ejs
      context: {
        question,
        userName,
        userEmail,
      },
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.originalname,
          content: attachment.buffer,
        },
      ];
    }

    await this.mailerService.sendMail(mailOptions);
  }
}
