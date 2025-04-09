import { Transform } from "class-transformer";
import { IsOptional, IsString, IsArray, IsEnum, IsMongoId } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";
import { TransformStatusEnum } from "src/app/features/transformation/domain/constants/enum/transform-status-enum";

export class TransformsGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null; // Search term

  @IsEnum(TransformStatusEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly status?: TransformStatusEnum | null = null; // Filter by Transform status
  @IsMongoId()
  @IsOptional()
  public readonly buyerId?: string; // Optional: Company ID related to the Transform

  @IsMongoId()
  @IsOptional()
  public readonly sellerId?: string; // Optional: Company ID related to the Transform
  @IsMongoId()
  @IsOptional()
  public readonly userId?: string; 
  @IsMongoId()
  @IsOptional()
  public readonly startDate?: Date; // Optional: Company ID related to the Transform
  @IsMongoId()
  @IsOptional()
  public readonly endDate?: Date; // Optional: Company ID related to the Transform
}
