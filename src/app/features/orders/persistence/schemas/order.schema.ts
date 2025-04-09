import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { MediaSchema } from "src/app/features/medias/persistence/schemas/media.schema";
import { OrderStatusEnum } from "../../domain/constants/enum/order-status-enum";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { Product } from "../../domain/entities/product";
import { OrderTypeEnum } from "../../domain/constants/enum/order-type.enum";
import { TenderSchema } from "src/app/features/tenders/persistence/schemas/tender.schema";
import { Invoice } from "../../domain/entities/invoice";

@Schema(
    {
      collection: schemasNames.orders, 
      versionKey: false,
      timestamps: false,
    },
)
export class OrderSchema extends BaseWithInfoSchema {
    @Prop(
        {
          required: true,
        },
    )
    public readonly title: string;
    @Prop(
        {
          required: true,
          type: SchemaTypes.Date,
        },
      )
    public readonly endDate: Date;
    @Prop(
        {
          required: true,
          type: SchemaTypes.Date,
        },
    )
    public readonly deliverDate: Date;
    @Prop(
        {
          required: true,
          enum: OrderTypeEnum,
          default: OrderTypeEnum.TINY,
        },
      )
      public readonly type: string;
    @Prop(
        {
          enum: OrderStatusEnum,
          default: OrderStatusEnum.PLANING,
        },
      )
    public readonly status?: string;
    @Prop()
    public readonly region?: string;

    @Prop()
    public readonly city?: string;
    @Prop()
    public readonly address?: string;
    @Prop()
    public readonly fileName?: string;
    @Prop()
    public readonly fileDescription?: string;
    @Prop(
        {
          type: Types.ObjectId,
          ref: MediaSchema.name,
        },
    )
    public readonly fileId?: ObjectId;
    @Prop()
    public readonly attachmentName?: string;

    @Prop()
    public readonly attachmentDescription?: string;
    @Prop(
        {
          type: Types.ObjectId,
          ref: MediaSchema.name,
        },
    )
    public readonly attachmentId?: ObjectId;
    @Prop(
        {
          default: false,
        },
    )
    public readonly attachmentRequired: boolean;
    
    @Prop()
    public readonly attachmentDeliverDays?: number;
    @Prop()
    public readonly contactInfo?: string;
    @Prop(
        {
          required: true,
          index: true,
          type: Types.ObjectId,
          ref: TenderSchema.name,
        },
      )
      public readonly tenderId: ObjectId;
    @Prop(
        {
          required: true,
          index: true,
          type: Types.ObjectId,
          ref: CompanySchema.name,
        },
      )
      public readonly companyId: ObjectId;
    
      @Prop(
        {
          required: true,
          index: true,
          type: Types.ObjectId,
          ref: UserSchema.name,
        },
      )
      public readonly userId: ObjectId;
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
          companyId: { type: Types.ObjectId, ref: 'CompanySchema', required: false },
          tender: {type: Types.ObjectId, ref: 'TenderSchema', required: false}
        }],
        default: [], // Set default to an empty array
      })
      public readonly products: Product[];
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
          companyId: { type: Types.ObjectId, ref: 'CompanySchema', required: false },
          tender: {type: Types.ObjectId, ref: 'TenderSchema', required: false}
        }],
        default: [], // Set default to an empty array
      })
      public readonly Sendedproducts: Product[];
      @Prop()
      public readonly OrderNr?: number;
      @Prop()
      public readonly DeliveryMethod?: string;
      @Prop()
      public readonly paymentMethod?: string;
      @Prop({
        type: [{
          fileName: { type: String, required: true },
          companyId: { type: Types.ObjectId, ref: 'CompanySchema', required: true },
          createdDate: { type: Date, default: Date.now },
          userId: { type: Types.ObjectId, ref: UserSchema.name, required: true },
          enVersion: { type: String, required: true }, // English Invoice S3 URL
          arVersion: { type: String, required: true }, // Arabic Invoice S3 URL
        }],
        default: [],
      })
      public readonly invoices?: Invoice[];
}
export const CreatedOrderSchema =
  SchemaFactory
    .createForClass(
      OrderSchema,
    );
CreatedOrderSchema
.set(
    'toJSON',
    {
        virtuals: true,
    },
);
  
CreatedOrderSchema
    .set(
      'toObject',
      {
        virtuals: true,
      },
    );