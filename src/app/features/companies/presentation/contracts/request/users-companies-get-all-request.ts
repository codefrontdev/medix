import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";

export class UsersCompaniesGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly userid?: string | null = null;
  public readonly search?: string | null = null;
}