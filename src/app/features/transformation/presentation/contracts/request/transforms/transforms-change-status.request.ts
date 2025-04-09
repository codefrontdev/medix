import { IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TransformStatusEnum } from 'src/app/features/transformation/domain/constants/enum/transform-status-enum';

export class TransformsChangeStatusRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string; // ID of the Transform to change the status for

  @IsEnum(TransformStatusEnum)
  @IsOptional()
  public readonly status?: TransformStatusEnum; // New status for the Transform

  @IsOptional()
  public readonly transformRequest?: Boolean; // New status for the Transform

  @IsOptional()
  public readonly withdrawRequest?: Boolean; // New status for the Transform

  @IsMongoId()
  @IsOptional()
  public readonly buyerId?: string; // Optional: Company ID related to the Transform

  @IsMongoId()
  @IsOptional()
  public readonly sellerId?: string; // Optional: Company ID related to the Transform
}
