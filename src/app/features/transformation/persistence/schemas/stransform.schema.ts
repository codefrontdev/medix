import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { TransformStatusEnum } from "../../domain/constants/enum/transform-status-enum";
import { Bank } from "src/app/@core/shared/domain/entities/bank";
import { OrderSchema } from "src/app/features/orders/persistence/schemas/order.schema";
import { Product } from "src/app/features/orders/domain/entities/product";
import { TransformTypeEnum } from "../../domain/constants/enum/transform-type.enum";


@Schema({
  collection: schemasNames.transforms,
  versionKey: false,
  timestamps: false,
})
export class TransformSchema extends BaseWithInfoSchema {
  @Prop({ required: true })
  public readonly title: string;

  @Prop({
    enum: TransformStatusEnum,
    default: TransformStatusEnum.PENDING,
  })
  public readonly status?: string;

  @Prop({
    index: true,
    type: Types.ObjectId,
    ref: CompanySchema.name,
  })
  public readonly buyerId: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: CompanySchema.name,
  })
  public readonly sellerId: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: UserSchema.name,
  })
  public readonly userId: ObjectId;
  @Prop({
    index: true,
    type: Types.ObjectId,
    ref: OrderSchema.name,
  })
  public readonly orderId: ObjectId;
  @Prop({
    enum: TransformTypeEnum,
    default: TransformTypeEnum.TRANSFORM,
  })
  public readonly type?: string;
 @Prop({
    type: [{ 
      itemId: { type: String, required: true },
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      notice: { type: String, required: false },
      image: { type: String, required: false },
      attachment: { type: SchemaTypes.Mixed, required: false }, // Can also remain as Mixed for flexibility
      SKUCode: { type: String, required: false },
      vat: { type: String, required: false },
    },
  ],
    default: [], // Set default to an empty array
  })
  public readonly products: Product[];
  @Prop()
  public readonly totalPrice: Number;
  @Prop(
    {
      default: false,
    },
  )
  public readonly transformRequest: Boolean;
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
  public readonly transformDoc?: Attachment[];
  @Prop(
    {
      default: false,
    },
  )
  public readonly withdrawRequest: Boolean;
  @Prop({
    type: [
      {
        accountName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        bankName: { type: String, required: true },
        iban: { type: String, required: true },
      },
    ],
    default: [],
  })
  public readonly bankAccount?: Bank[];
 
}

export const CreatedTransformSchema = SchemaFactory.createForClass(TransformSchema);

CreatedTransformSchema.set("toJSON", { virtuals: true });
CreatedTransformSchema.set("toObject", { virtuals: true });
