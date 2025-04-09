import { Transform } from "class-transformer";
import { IsOptional, IsString, IsEnum, IsMongoId } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";
import { TenderQuotationStatusEnum } from "../../../../domain/constants/enums/tender-quotation-status.enum";

export class TenderQuotationsGetAllRequest extends AppPagingRequest {
  @IsEnum(TenderQuotationStatusEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly status?: TenderQuotationStatusEnum | null = null;

  @IsMongoId()
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly tenderId?: string | null = null;
}
