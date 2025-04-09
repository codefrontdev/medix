import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { Notification } from "../../domain/entities/notification";
import { NotificationSchema } from "../schemas/notification.schema";
import { NotificationSchemaFactory } from "../factories/category-schema.factory";
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationsRepository extends BaseRepository<NotificationSchema, Notification> {
  public constructor(
    @InjectModel(NotificationSchema.name)
    public readonly model: Model<NotificationSchema>,
    public readonly schemaFactory: NotificationSchemaFactory,
  ) {
    super(model, schemaFactory);
  }

  /**
   * Finds notifications for a specific user.
   * @param userId The ID of the user.
   * @returns A promise that resolves to an array of notifications.
   */
  public async findByUserId(userId: string): Promise<Notification[]> {
    const results = await this.model.find({ userId }).sort({ createdAt: -1 }).limit(20).exec();
    return results.map((doc) => this.schemaFactory.createFromSchema(doc));
  }

  /**
   * Inserts a new notification.
   * @param notification The notification entity to insert.
   */
  public async insert(notification: Notification): Promise<void> {
    const schema = this.schemaFactory.create(notification);
    const newNotification = new this.model(schema);
    await newNotification.save();
  }

  /**
   * Updates an existing notification.
   * @param id The ID of the notification to update.
   * @param notification The updated notification entity.
   */
  public async update(id: string, notification: Notification): Promise<void> {
    const objectId = new ObjectId(id);
    const schema = this.schemaFactory.create(notification);
    const { _id, ...updatePayload } = schema;
    await this.model.updateOne({ _id: objectId }, { $set: updatePayload }).exec();
  }

  /**
   * Deletes a notification by its ID.
   * @param id The ID of the notification to delete.
   */
  public async deleteById(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  /**
   * Retrieves a notification by its ID.
   * @param id The ID of the notification to retrieve.
   * @returns The notification entity or null if not found.
   */
  public async getById(id: string): Promise<Notification | null> {
    const objectId = new ObjectId(id);
    const result = await this.model.findById(objectId).exec();
    return result ? this.schemaFactory.createFromSchema(result) : null;
  }
}
