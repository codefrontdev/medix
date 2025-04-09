import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req, Put } from '@nestjs/common';

import { Notification } from '../../domain/entities/notification';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { NotificationService } from '../../notification.service';

@Controller({
  path: 'notifications',
})
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Create a new notification.
   * @param userId - ID of the user to notify.
   * @param type - Type of notification.
   * @param message - Notification message.
   */
  @Post()
  async createNotification(
    @Body('userId') userId: string,
    @Body('type') type: string,
    @Body('message') message: string,
  ): Promise<Notification> {
    return this.notificationService.createNotification(userId, type, message);
  }

  /**
   * Get all notifications for a specific user, optionally filtering by read status.
   * @param userId - ID of the user.
   * @param isRead - (Optional) Filter for read/unread notifications.
   */
   @UseGuards(
      JwtAuthGuard,
    )
  @Get('user')
  public async getNotificationsForUser(
    @Req() req: any,
    @Query('isRead') isRead?: boolean,
  ): Promise<Notification[]> {
    const { userId } = req.user;
    console.log(userId,"userId")
    const parsedIsRead = isRead === true ? true : isRead === false ? false : undefined;
    return this.notificationService.getNotificationsForUser(userId, parsedIsRead);
  }

  /**
   * Mark a notification as read.
   * @param id - ID of the notification to mark as read.
   */
  @UseGuards(
    JwtAuthGuard,
  )
  @Put('/mark-as-read/:id')
  async markNotificationAsRead(@Param('id') id: string): Promise<Notification> {
    console.log(id,"ID")
    return this.notificationService.markAsRead(id);
  }

  /**
   * Delete a specific notification.
   * @param id - ID of the notification to delete.
   */
  @Delete(':id')
  async deleteNotification(@Param('id') id: string): Promise<void> {
    await this.notificationService.deleteNotification(id);
  }
}
