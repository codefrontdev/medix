import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { MediaSchema } from "src/app/features/medias/persistence/schemas/media.schema";
import { ItemStatusEnum } from "../../domain/constants/enum/item-status-enum";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";


@Schema({
  collection: schemasNames.items,
  versionKey: false,
  timestamps: false,
})
export class ItemSchema extends BaseWithInfoSchema {
  @Prop({ required: true })
  public readonly name: string;

  @Prop()
  public readonly SKUCode: string;
  @Prop()
  public readonly manufacturer: string;
  @Prop()
  public readonly brand: string;
  @Prop()
  public readonly model: string;
  @Prop()
  public readonly unit: string;
  @Prop()
  public readonly categories: string;

  @Prop()
  public readonly description?: string;

  @Prop({ required: true })
  public readonly price: number;

  @Prop()
  public readonly vat?: number;

  @Prop({ default: 0 })
  public readonly stock?: number;

  @Prop({ type: [String], default: [] })
  public readonly tags?: string[];

  @Prop({ type: SchemaTypes.String })
  public readonly image?: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        fileId: { type: String, required: false, default: null },
        filepath: { type: String, required: true },
      },
    ],
    default: [],
  })
  public readonly attachments?: Attachment[]; // Use Attachment class here

  @Prop({
    enum: ItemStatusEnum,
    default: ItemStatusEnum.ACTIVE,
  })
  public readonly status: string;

  @Prop({ required: true })
  public readonly type: string;

  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.ObjectId,
    ref: CompanySchema.name,
  })
  public readonly companyId: ObjectId;
  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.ObjectId,
    ref: UserSchema.name,
  })
  public readonly userId: ObjectId;
  @Prop({
    required: true,
    default: 0,
  })
  public readonly ItemNR: number;
  @Prop({
    required: true,
    default: 0,
  })
  public readonly displayOrder: number;

  @Prop({
    default: true,
  })
  public readonly isVisible: boolean;

  @Prop()
  public readonly createdAt?: Date;

  @Prop()
  public readonly updatedAt?: Date;

  @Prop()
  public readonly deletedAt?: Date;

  @Prop()
  public readonly createdBy?: string;

  @Prop()
  public readonly updatedBy?: string;

  @Prop()
  public readonly deletedBy?: string;
}

export const CreatedItemSchema = SchemaFactory.createForClass(ItemSchema);

CreatedItemSchema.set("toJSON", { virtuals: true });
CreatedItemSchema.set("toObject", { virtuals: true });
