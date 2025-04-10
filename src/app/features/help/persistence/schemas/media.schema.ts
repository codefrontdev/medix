import { Prop, Schema } from "@nestjs/mongoose";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

@Schema({
  collection: schemasNames.medias,
  versionKey: false,
  timestamps: false,
})
export class MediaSchema extends BaseWithInfoSchema {
  @Prop()
  public readonly url: string;

  @Prop()
  public readonly uniqueName: string;

  @Prop()
  public readonly name: string;

  @Prop()
  public readonly size: number;

  @Prop()
  public readonly type: string;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: 'CompanySchema', // Use string name for the reference
  })
  public readonly companyId: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: 'UserSchema', // Use string name for the reference
  })
  public readonly userId: ObjectId;

  @Prop({
    required: true,
    enum: ['Order', 'Tender', 'Tender-quotation', 'Payment', 'Item', 'Company'], // Enum for source types
  })
  public readonly sourceType: string;

  @Prop({
    type: Types.ObjectId,
    refPath: 'sourceType', // Dynamic reference based on sourceType
  })
  public readonly source: Types.ObjectId;

  @Prop()
  public readonly isProtected: boolean;
}
