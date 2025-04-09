import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { TenderQuotationStatusEnum } from "../../domain/constants/enums/tender-quotation-status.enum";
import { TenderSchema } from "./tender.schema";
import { Company } from "src/app/features/companies/domain/entities/company";
import { ItemSchema } from "src/app/features/items/persistence/schemas/item.schema";
import { Product } from "../../domain/entities/product";





@Schema(
  {
    collection: schemasNames.tenderQuotations, // Adjust this name to your schema name
    versionKey: false,
    timestamps: false,
  },
)
export class TenderQuotationSchema extends BaseWithInfoSchema {
  @Prop(
    {
      required: true,
    },
  )
  /*
  public readonly value: number;

  @Prop()
  public readonly description: string;
  */
  @Prop({
    type: [{ 
      productId: { type: String, ref: ItemSchema.name, required: true }, // Reference to ItemSchema
      unitName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      attachment: { type: SchemaTypes.Mixed, required: false }, // Optional attachment
      image: { type: String, required: false }, // Optional image
      notice: { type: String, required: false }, // Optional description
      SKUCode	: { type: String, required: false }, // Optional description
      vat: { type: String, required: false }, // Optional description
    },
  ],
    default: [], // Set default to an empty array
  })
  public readonly products: Product[];
  @Prop()
  public readonly paymentMethod: string;
  @Prop()
  public readonly DeadLineDate: string;
  @Prop()
  public readonly DeliveryMethod: string;
  @Prop()
  public readonly contactMethod: string;
  @Prop()
  public readonly OpportunityNr: number;

  public readonly deliverDays: number;

  @Prop(
    {
      enum: TenderQuotationStatusEnum,
      default: TenderQuotationStatusEnum.PENDING,
    },
  )
  public readonly status?: string;


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

  public readonly company: Company | null;

  @Prop(
    {
      required: true,
      index: true,
      type: Types.ObjectId,
      ref: UserSchema.name,
    },
  )
  public readonly userId: ObjectId;
}

export const CreatedTenderQuotationSchema =
  SchemaFactory
    .createForClass(
      TenderQuotationSchema,
    );

CreatedTenderQuotationSchema
  .virtual(
    'company',
    {
      ref: CompanySchema.name,
      localField: 'companyId',
      foreignField: '_id',
      justOne: true,
    },
  );

CreatedTenderQuotationSchema
  .set(
    'toJSON',
    {
      virtuals: true,
    },
  );

CreatedTenderQuotationSchema
  .set(
    'toObject',
    {
      virtuals: true,
    },
  );