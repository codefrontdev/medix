import { IsString, IsOptional, IsDate, IsEnum, IsNumber, IsArray, IsMongoId, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderTypeEnum } from '../../../../domain/constants/enum/order-type.enum';
import { OrderStatusEnum } from '../../../../domain/constants/enum/order-status-enum';
import { Invoice } from 'src/app/features/orders/domain/entities/invoice';

class Product {
  @IsMongoId()
  @IsOptional()
  public readonly itemId?: string;

  @IsString()
  public readonly item: string;

  @IsNumber()
  public readonly quantity: number;

  @IsNumber()
  public readonly price: number;

  @IsNumber()
  @IsOptional()
  public readonly discount?: number;

  @IsString()
  @IsOptional()
  public readonly notice?: string;

  @IsString()
  @IsOptional()
  public readonly image?: string;

  @IsOptional()
  public readonly attachment?: File | null; // Ensure File types are handled appropriately
  @IsString()
  @IsOptional()
  public readonly SKUCode?: string;
  @IsString()
  @IsOptional()
  public readonly vat?: string;

  @IsMongoId()
  @IsOptional()
  public readonly companyId?: string;
  @IsMongoId()
  @IsOptional()
  public readonly tender?: string;
  @IsMongoId()
  @IsOptional()
  public readonly quatationId?: string;
}

export class OrdersUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly title: string;

  @IsDate()
  @Type(() => Date)
  public readonly endDate: Date;

  @IsDate()
  @Type(() => Date)
  public readonly deliverDate: Date;

  @IsEnum(OrderTypeEnum)
  public readonly type: OrderTypeEnum;

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  public readonly status?: OrderStatusEnum;

  @IsString()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsOptional()
  public readonly city?: string;

  @IsString()
  @IsOptional()
  public readonly address?: string;

  @IsString()
  @IsOptional()
  public readonly fileName?: string;

  @IsString()
  @IsOptional()
  public readonly fileDescription?: string;

  @IsMongoId()
  @IsOptional()
  public readonly fileId?: string;

  @IsString()
  @IsOptional()
  public readonly attachmentName?: string;

  @IsString()
  @IsOptional()
  public readonly attachmentDescription?: string;

  @IsMongoId()
  @IsOptional()
  public readonly attachmentId?: string;

  @IsBoolean()
  public readonly attachmentRequired: boolean;

  @IsNumber()
  @IsOptional()
  public readonly attachmentDeliverDays?: number;

  @IsString()
  @IsOptional()
  public readonly contactInfo?: string;

  @IsMongoId()
  @IsOptional()
  public readonly tenderId?: string;

  @IsMongoId()
  @IsOptional()
  public readonly companyId?: string;

  @IsMongoId()
  @IsOptional()
  public readonly userId?: string;

  @IsArray()
  @Type(() => Product)
  public readonly products: Product[];
  @IsArray()
  @Type(() => Product)
  public readonly Sendedproducts: Product[];
  
  @IsNumber()
  @IsOptional()
  public readonly OrderNr?: number;
  
  @IsOptional()
  public readonly DeliveryMethod?: string;
  
  @IsOptional()
  public readonly paymentMethod?: string;
  @IsArray()
  @Type(() => Invoice)
  public readonly invoices: Invoice[];
}
