import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationsRepository } from './persistence/repositories/notifications.repository';
import { CreatedNotificationSchema, NotificationSchema } from './persistence/schemas/notification.schema';
import { NotificationSchemaFactory } from './persistence/factories/category-schema.factory';
import { NotificationFactory } from './application/factories/notification.factory';
import { NotificationsController } from './presentation/controllers/notifications.controller';
import { NotificationService } from './notification.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: NotificationSchema.name, schema: CreatedNotificationSchema }]),
  ],
  providers: [
    NotificationGateway,
    NotificationsRepository,
    NotificationSchemaFactory,
    NotificationFactory,
    NotificationService
  ],
  controllers:[
    NotificationsController
  ],
  exports: [
    NotificationsRepository,
    NotificationSchemaFactory,
  ],
})
export class NotificationModule {}
