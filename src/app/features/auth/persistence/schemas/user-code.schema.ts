import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { BaseSchema } from "src/app/@core/shared/persistence/schemas/base.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";

@Schema(
  {
    collection: schemasNames.userCodes,
    versionKey: false,
    timestamps: false,
  },
)
export class UserCodeSchema extends BaseSchema {
  @Prop(
    {
      required: true,
      unique: true,
      index: true,
    },
  )
  public readonly code: string;

  @Prop(
    {
      required: true,
    },
  )
  public readonly type: string;

  @Prop(
    {
      required: true,
    },
  )
  public readonly sentTo: string;

  @Prop(
    {
      required: true,
      index: true,
      type: Types.ObjectId,
      ref: UserSchema.name,
    },
  )
  public readonly userId: ObjectId;

  @Prop(
    {
      required: true,
    },
  )
  public readonly expirationDate: Date;
}