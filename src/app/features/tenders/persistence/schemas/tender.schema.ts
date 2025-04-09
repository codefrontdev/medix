import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { MediaSchema } from "src/app/features/medias/persistence/schemas/media.schema";
import { CategorySchema } from "src/app/features/categories/persistence/schemas/category.schema";
import { TenderTypeEnum } from "../../domain/constants/enums/tender-type.enum";
import { TenderStatusEnum } from "../../domain/constants/enums/tender-status.enum";
import { ReceiveDocumentsTypeEnum } from "../../domain/constants/enums/receive-documents-type.enum";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { Category } from "src/app/features/categories/domain/entities/category";
import { PaylaterTypeEnum } from "../../domain/constants/enums/Paylater-type.enum";
import { Product } from "../../domain/entities/tender-product";


@Schema(
  {
    collection: schemasNames.tenders, // Adjust this name to your schema name
    versionKey: false,
    timestamps: false,
  },
)
export class TenderSchema extends BaseWithInfoSchema {
  @Prop(
    {
      required: true,
    },
  )
  public readonly title: string;

  @Prop(
    {
      required: true,
      type: SchemaTypes.Number,
    },
  )
  public readonly minValue: number;

  @Prop(
    {
      required: true,
      type: SchemaTypes.Number,
    },
  )
  public readonly value: number;

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
      enum: TenderTypeEnum,
      default: TenderTypeEnum.TINY,
    },
  )
  public readonly type: string;

  @Prop(
    {
      enum: TenderStatusEnum,
      default: TenderStatusEnum.PLANING,
    },
  )
  public readonly status?: string;

  @Prop(
    {
      required: false,
      default: [],
      type: [
        {
          type: Types.ObjectId,
          ref: CategorySchema.name,
        },
      ],
    },
  )
  public readonly categoriesIds: ObjectId[];

  public readonly categories: Category[] | null;

  @Prop()
  public readonly region?: string;

  @Prop()
  public readonly city?: string;

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

  @Prop(
    {
      required: true,
      enum: ReceiveDocumentsTypeEnum,
      default: ReceiveDocumentsTypeEnum.BOTH,
    },
  )
  public readonly receiveDocumentsType: string;
  @Prop(
    {
      required: true,
      enum: PaylaterTypeEnum,
      default: PaylaterTypeEnum.NO,
    },
  )
  public readonly Paylater: string;

  @Prop()
  public readonly contactInfo?: string;

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
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: false },
      notice: { type: String, required: false },
      attachment: { type: SchemaTypes.Mixed, required: false } // Can also remain as Mixed for flexibility
    }],
    default: [], // Set default to an empty array
  })
  public readonly products: Product[];
  @Prop()
  public readonly TenderNr?: number;

}

export const CreatedTenderSchema =
  SchemaFactory
    .createForClass(
      TenderSchema,
    );

CreatedTenderSchema
  .virtual(
    'categories',
    {
      ref: CategorySchema.name,
      localField: 'categoriesIds',
      foreignField: '_id',
      justOne: false,
    },
  );


CreatedTenderSchema
  .set(
    'toJSON',
    {
      virtuals: true,
    },
  );

CreatedTenderSchema
  .set(
    'toObject',
    {
      virtuals: true,
    },
  );