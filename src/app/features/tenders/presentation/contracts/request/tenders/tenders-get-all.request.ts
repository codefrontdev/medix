import { Transform } from "class-transformer";
import { IsOptional, IsString, IsArray, IsUUID, IsEnum, IsMongoId } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";
import { TenderStatusEnum } from "../../../../domain/constants/enums/tender-status.enum";
import { TenderTypeEnum } from "../../../../domain/constants/enums/tender-type.enum";

export class TendersGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null;

  @IsEnum(TenderTypeEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly type?: TenderTypeEnum | null = null;

  @IsEnum(TenderStatusEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly status?: TenderStatusEnum | null = null;

  @IsArray()
  @IsOptional()
  @Transform(appTransforms.stringCommasSeparatedTransform)
  public readonly categoriesIds?: string[] | null = null;

  @IsMongoId()
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly companyId?: string | null = null;
}
