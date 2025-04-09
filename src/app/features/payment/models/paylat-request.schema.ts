import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PaylatRequest extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ required: true })
  company: string;

  @Prop({ default: 'pending' }) // "pending", "approved", "rejected"
  status: string;

  @Prop()
  rejectionReason?: string;
}

export type PaylatRequestDocument = PaylatRequest & Document;
export const PaylatRequestSchema = SchemaFactory.createForClass(PaylatRequest);
