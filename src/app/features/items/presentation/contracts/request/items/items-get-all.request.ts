import { Transform } from "class-transformer";
import { IsOptional, IsString, IsArray, IsEnum, IsMongoId } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";
import { ItemStatusEnum } from "../../../../domain/constants/enum/item-status-enum";
import { ItemTypeEnum } from "../../../../domain/constants/enum/item-type.enum";

export class ItemsGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null; // Search term

  @IsEnum(ItemTypeEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly type?: ItemTypeEnum | null = null; // Filter by item type

  @IsEnum(ItemStatusEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly status?: ItemStatusEnum | null = null; // Filter by item status

  @IsArray()
  @IsOptional()
  @Transform(appTransforms.stringCommasSeparatedTransform)
  public readonly tenderId?: string | null = null; // Filter by tender ID

  @IsMongoId()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly companyId?: string | null = null; // Filter by company ID
}
