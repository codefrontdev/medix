import { Prop } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

export abstract class BaseWithInfoSchema extends BaseSchema {
  @Prop(
    {
      default: 0,
    },
  )
  readonly displayOrder: number = 0;

  @Prop(
    {
      default: true,
    },
  )
  readonly isVisible: boolean = true;

  @Prop()
  createdAt?: Date = null;

  @Prop()
  updatedAt?: Date = null;

  @Prop()
  readonly deletedAt?: Date = null;

  @Prop()
  readonly createdBy?: string = null;

  @Prop()
  readonly updatedBy?: string = null;

  @Prop()
  readonly deletedBy?: string = null;
}