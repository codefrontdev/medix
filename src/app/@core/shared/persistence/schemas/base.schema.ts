import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export abstract class BaseSchema {
  @Prop(
    {
      required: true,
    },
  )
  readonly _id: ObjectId;
}