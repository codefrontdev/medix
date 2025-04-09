import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { ObjectId } from 'mongodb';
import { Notification } from '../../domain/entities/notification';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { NotificationsRepository } from '../../persistence/repositories/notifications.repository';

@Injectable()
export class NotificationFactory implements EntityFactory<Notification> {
  public constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  public async save(
    id: string | null,
    userId: string,
    type: string,
    message: string,
    isRead: boolean,
    createdAt: Date,
  ): Promise<Notification | null> {
    const isInsert = id === null;

    if (isInsert) {
      const entity = new Notification(
        createObjectIdAsString(id), // Generate new ObjectId as string
        userId,
        type,
        message,
        isRead,
        createdAt,
      );

      await this.notificationsRepository.insert(entity);

      return entity;
    }

    const foundEntity = await this.notificationsRepository.getById(id);

    if (foundEntity == null) {
      return null;
    }

    // Update fields of the found entity
    // foundEntity.type = type; // 'type' is read-only and cannot be reassigned
    const updatedEntity = new Notification(
      foundEntity.id,
      foundEntity.userId,
      foundEntity.type,
      message,
      isRead,
      createdAt,
    );

    await this.notificationsRepository.getAndUpdate(
      { _id: new ObjectId(id) }, // Filter by ObjectId
      updatedEntity,
    );

    return updatedEntity;
  }
}
