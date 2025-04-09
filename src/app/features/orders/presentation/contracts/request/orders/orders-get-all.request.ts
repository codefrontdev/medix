import { Transform } from "class-transformer";
import { IsOptional, IsString, IsArray, IsUUID, IsEnum, IsMongoId } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";
import { OrderStatusEnum } from "../../../../domain/constants/enum/order-status-enum";
import { OrderTypeEnum } from "../../../../domain/constants/enum/order-type.enum";

export class OrdersGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null;

  @IsEnum(OrderTypeEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly type?: OrderTypeEnum | null = null;

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly status?: OrderStatusEnum | null = null;

  @IsArray()
  @IsOptional()
  @Transform(appTransforms.stringCommasSeparatedTransform)
  public readonly TenderId?: string[] | null = null;

  @IsMongoId()
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly companyId?: string | null = null;
}
