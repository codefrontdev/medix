import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Req, UseGuards, ForbiddenException } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { HelpService } from './help.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/application/guards/jwt-auth.guard';
import { UserService } from '../users/user.service';
// Update import path to existing UserService

@Controller(
  {
    path: 'web/help',
  },
)
export class HelpController {
  constructor(
    private readonly helpService: HelpService,
    private readonly userService: UserService, // Inject UserService
  ) {}
 @UseGuards(
    JwtAuthGuard
  )
  @Post('questions')
  @UseInterceptors(FileInterceptor('attachment'))
  async sendHelpRequest(
    @Body('question') question: string,
    @UploadedFile() attachment: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = await this.userService.findById((req.user as any)?.userId); // Get user from database
    console.log(user)
    const userName = user.nickName;
    const userEmail = user.email;

    // Handle optional attachment
    const attachmentFileName = attachment ? attachment : null;

    try {
      await this.helpService.sendHelpRequest(question, attachmentFileName, userName, userEmail);
      return { success: true, message: 'Help request sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send help request', error: error.message };
    }
  }
}
