import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { UserSchema } from "src/app/features/users/persistence/schemas/user.schema";
import { CompanySchema } from "src/app/features/companies/persistence/schemas/company.schema";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { CompanyOwnerTypeEnum } from "../../domain/constants/enums/company-owner-type.enum";

@Schema(
    {
      collection: schemasNames.userCompanies,
      versionKey: false,
      timestamps: false,
    },
)
export class UserCompaniesSchema extends BaseWithInfoSchema {
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
          index: true,
          type: Types.ObjectId,
          ref: CompanySchema.name,
        },
    )
    public readonly companyId: ObjectId;
    @Prop(
        {
          default: CompanyOwnerTypeEnum.AUTHORIZED,
        },
    )
    public readonly Role: string;

}