import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './persistence/repositories/notifications.repository';
import { Notification } from './domain/entities/notification';
import { NotificationGateway } from './notification.gateway';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly notificationGateway: NotificationGateway, // Inject Gateway for real-time notifications
  ) {}

  /**
   * Create a new notification.
   * @param userId - The ID of the user to notify.
   * @param type - The type of notification (e.g., info, warning, etc.).
   * @param message - The message to include in the notification.
   */
  async createNotification(
    userId: string,
    type: string,
    message: string,
  ): Promise<Notification> {
    const notification = new Notification(
      new ObjectId().toString(), // Generate a new unique ID
      userId,
      type,
      message,
      false, // isRead
      new Date(), // createdAt
    );

    await this.notificationsRepository.insert(notification);

    // Send real-time notification via Gateway
    this.notificationGateway.sendNotificationToUser(userId, message);

    return notification;
  }

  /**
   * Get all notifications for a specific user.
   * @param userId - The ID of the user to retrieve notifications for.
   */
  async getNotificationsForUser(userId: string, parsedIsRead: boolean): Promise<Notification[]> {
    return this.notificationsRepository.findByUserId(userId);
  }

  /**
   * Mark a specific notification as read.
   * @param id - The ID of the notification to mark as read.
   */
  async markAsRead(id: string): Promise<Notification> {
    
    const notification = await this.notificationsRepository.getById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.isRead = true;
    await this.notificationsRepository.update(id, notification);
    return notification;
  }

  /**
   * Delete a specific notification.
   * @param id - The ID of the notification to delete.
   */
  async deleteNotification(id: string): Promise<void> {
    await this.notificationsRepository.deleteById(id);
  }
}
