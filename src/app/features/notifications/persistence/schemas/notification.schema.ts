import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'notifications', timestamps: true })
export class NotificationSchema extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId; // Mongoose ObjectId

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const CreatedNotificationSchema = SchemaFactory.createForClass(NotificationSchema);
