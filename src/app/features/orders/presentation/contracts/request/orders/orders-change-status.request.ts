import { IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { OrderStatusEnum } from '../../../../domain/constants/enum/order-status-enum';

export class OrdersChangeStatusRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  public readonly status?: OrderStatusEnum;

  @IsMongoId()
  @IsOptional()
  public readonly tenderQuotationId?: string;
  @IsMongoId()
  @IsOptional()
  public readonly orderId?: string;
}