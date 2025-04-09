import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { TransformStatusEnum } from 'src/app/features/transformation/domain/constants/enum/transform-status-enum';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { Bank } from 'src/app/@core/shared/domain/entities/bank';
import { Product } from 'src/app/features/orders/domain/entities/product';
import { TransformTypeEnum } from 'src/app/features/transformation/domain/constants/enum/transform-type.enum';

export class TransformsUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string; // Optional for inserts, required for updates

  @IsString()
  public readonly title: string; // Title of the Transform

  @IsEnum(TransformStatusEnum)
  @IsOptional()
  public readonly status?: TransformStatusEnum; // Status of the Transform

  @IsMongoId()
  public readonly buyerId: string; // ID of the buyer

  @IsMongoId()
  public readonly sellerId: string; // ID of the seller

  @IsMongoId()
  public readonly userId: string; // ID of the user performing the action

  @IsMongoId()
  public readonly orderId: string; // ID of the associated order

  @IsEnum(TransformTypeEnum)
  @IsOptional()
  public readonly type?: TransformTypeEnum;

  @IsArray()
  @Type(() => Product)
  @IsOptional()
  public readonly products?: Product[]; // Array of products in the Transform

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  public readonly totalPrice: number; // Total price of the Transform

  @IsBoolean()
  @Transform(({ value }) => {
    console.log(value,"Value,Value")
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return !!value;
  })
  public readonly transformRequest: boolean; // Transform request flag

  @IsArray()
  @Type(() => Attachment)
  @IsOptional()
  public readonly transformDoc?: Attachment[]; // Optional transform documentation

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  public readonly withdrawRequest?: boolean; // Withdraw request flag

  @IsArray()
  @Type(() => Bank)
  @IsOptional()
  public readonly bankAccount?: Bank[]; // Bank account information for withdrawal

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  public readonly isVisible?: boolean; // Optional visibility flag
}
