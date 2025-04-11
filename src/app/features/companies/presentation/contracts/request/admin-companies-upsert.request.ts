/** @format */

import { IsMongoId, IsOptional } from "class-validator";
import { CompaniesUpsertRequest } from "./companies-upsert.request";

export class AdminCompaniesUpsertRequest extends CompaniesUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly userId: string; // حقل userId فقط للـ Admin
}
