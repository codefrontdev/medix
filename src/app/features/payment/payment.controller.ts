import { 
  Controller, Post, Body, UploadedFile, 
  UseInterceptors, Req, UseGuards, ForbiddenException, 
  Get,
  Param,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/application/guards/jwt-auth.guard';
// import { UserService } from '../users/user.service';

@Controller('web/paylat')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    // private readonly userService: UserService,
  ) {}

  @Post('request')
  async sendPaylatRequest(
    @Body() body: { name: string; email: string; phoneNumber?: string; company: string },
    @Req() req: Request,
  ) {
    try {
      await this.paymentService.processPaylatRequest(body);
      return { success: true, message: 'Pay Later request sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send Pay Later request', error: error.message };
    }
  }
  @UseGuards(
    JwtAuthGuard,
  )
  @Get('all')
  async getAllPaylatRequests() {
    try {
      const requests = await this.paymentService.getAllPaylatRequests();
      return { success: true, data: requests };
    } catch (error) {
      return { success: false, message: 'Failed to fetch Paylat requests', error: error.message };
    }
  }
  @Post('accept/:id')
  async acceptPaylat(@Param('id') id: string) {
    try {
      await this.paymentService.acceptPaylatRequest(id);
      return { success: true, message: 'Paylat request approved and email sent!' };
    } catch (error) {
      throw new HttpException("Failed to approve Paylat request", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('refuse/:id')
  async refusePaylat(@Param('id') id: string, @Body() body: { reason: string }) {
    try {
      await this.paymentService.refusePaylatRequest(id, body.reason);
      return { success: true, message: 'Paylat request refused and email sent!' };
    } catch (error) {
      throw new HttpException("Failed to refuse Paylat request", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
