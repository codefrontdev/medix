import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { ObjectId } from "mongodb";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { CompanyOwnerTypeEnum } from "../../domain/constants/enums/company-owner-type.enum";
import { CompanyTypeEnum } from "../../domain/constants/enums/company-type.enum";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { CategorySchema } from "src/app/features/categories/persistence/schemas/category.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";

@Schema({
  collection: schemasNames.companies,
  versionKey: false,
  timestamps: false,
})
export class CompanySchema extends BaseWithInfoSchema {
  @Prop({ required: true })
  public readonly nameAr: string;

  @Prop()
  public readonly nameEn?: string;

  @Prop()
  public readonly website?: string;

  @Prop()
  public readonly address?: string;

  @Prop()
  public readonly region?: string;

  @Prop()
  public readonly city?: string;

  @Prop({ required: true })
  public readonly registrationNumber: string;

  @Prop({ default: CompanyOwnerTypeEnum.OWNER })
  public readonly ownerType: string;

  @Prop()
  public readonly stampedAuthorizationFormUrl?: string; // Updated: URL for stamped authorization form

  @Prop()
  public readonly authorizationFileUrl?: string; // New: URL for authorization file

  @Prop()
  public readonly registeringFileUrl?: string; // New: URL for registering file

  @Prop({ type: SchemaTypes.Date })
  public readonly registrationExpirationDate?: Date;

  @Prop()
  public readonly creationDate?: Date;

  @Prop()
  public readonly placeOfIssue?: string;

  @Prop()
  public readonly turnover?: number;

  @Prop({ default: CompanyTypeEnum.ESTABLISHMENT })
  public readonly type: string;

  @Prop()
  public readonly activities?: string;

  @Prop({
    required: false,
    default: [],
    type: [
      {
        type: Types.ObjectId,
        ref: CategorySchema.name,
      },
    ],
  })
  public readonly categoriesIds: ObjectId[];

  @Prop()
  public readonly logoMedia?: string; // Updated: URL for logo media

  @Prop()
  public readonly taxInformation?: string; // New: Tax information

  @Prop()
  public readonly deliveryAddress?: string; // New: Delivery address

  @Prop()
  public readonly employeesNumber?: number; // New: Number of employees
  @Prop()
  public readonly CompanyNr?: string; // New: Number of employees
  @Prop()
  public readonly itemNr?: number; // New: Number of employees
  @Prop()
  public readonly orderNr?: number; // New: Number of employees
  @Prop()
  public readonly TenderNr?: number; // New: Number of employees
  @Prop()
  public readonly OpportunityNr?: number; // New: Number of employees
  

  @Prop()
  public readonly contactInfo?: string;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: UserSchema.name,
  })
  public readonly userId: ObjectId;
}
