import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { NotificationSchema } from '../schemas/notification.schema';
import { Notification } from '../../domain/entities/notification';

@Injectable()
export class NotificationSchemaFactory
  implements SchemaFactory<NotificationSchema, Notification>
{
  public create(entity: Notification): NotificationSchema {
    return {
      _id: new Types.ObjectId(entity.id), // Convert string to ObjectId
      userId: entity.userId,
      type: entity.type,
      message: entity.message,
      isRead: entity.isRead,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as NotificationSchema; // Explicit cast to NotificationSchema
  }

  public createFromSchema(entitySchema: NotificationSchema): Notification {
    return new Notification(
      entitySchema._id.toHexString(), // Convert ObjectId to string
      entitySchema.userId,
      entitySchema.type,
      entitySchema.message,
      entitySchema.isRead,
      entitySchema.createdAt,
      entitySchema.updatedAt,
    );
  }
}
