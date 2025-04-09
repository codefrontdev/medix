import { IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { ItemStatusEnum } from '../../../../domain/constants/enum/item-status-enum';

export class ItemsChangeStatusRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string; // ID of the item to change the status for

  @IsEnum(ItemStatusEnum)
  @IsOptional()
  public readonly status?: ItemStatusEnum; // New status for the item

  @IsMongoId()
  @IsOptional()
  public readonly companyId?: string; // Optional: Company ID related to the item
}
