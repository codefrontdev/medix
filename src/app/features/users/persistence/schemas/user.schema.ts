import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { GenderEnum } from "src/app/@core/values/enums/gender.enum";

@Schema(
  {
    collection: schemasNames.users,
    versionKey: false,
    timestamps: false,
  },
)
export class UserSchema extends BaseWithInfoSchema {
  @Prop(
    {
      required: true,
    },
  )
  public readonly nickName: string;

  @Prop(
    {
      required: true,
      unique: true,
      index: true,
      lowercase: true, // ✅ Automatically convert email to lowercase
      trim: true,
    },
  )
  public readonly email: string;

  @Prop(
    {
      index: true,
    },
  )
  public readonly phoneNumber: string;

  @Prop()
  public readonly isEmailConfirmed: boolean;

  @Prop()
  public readonly isPhoneNumberConfirmed: boolean;

  @Prop(
    {
      required: true,
    },
  )
  public readonly password: string;

  @Prop(
    {
      required: true,
    },
  )
  public readonly role: string;

  @Prop(
    {
      default: GenderEnum.MALE,
    },
  )
  public readonly gender: string;

  @Prop()
  public readonly accountType: string; // AccountTypeEnum

  @Prop()
  public readonly region?: string;

  @Prop()
  public readonly city?: string;
  @Prop()
  public readonly address?: string;

  @Prop()
  public readonly identityType?: string;

  @Prop()
  public readonly identityNo?: string;

  @Prop()
  public readonly residenceNo?: string;

  @Prop(
    {
      type: SchemaTypes.Date,
    },
  )
  public readonly dateOfBirth?: Date;

  @Prop(
    {
      default: false,
    },
  )
  public readonly isVerified: boolean;
}