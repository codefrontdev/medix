import { Transform } from "class-transformer";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";

export class CategoriesGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null;

  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly parentId?: string | null = null;
}