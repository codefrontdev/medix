import { IsOptional, IsEnum, IsNumber,IsArray, IsMongoId, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TenderQuotationStatusEnum } from '../../../../domain/constants/enums/tender-quotation-status.enum';
class Product {
  @IsMongoId()
  public readonly productId: string; // Reference to the product/item ID

  @IsString()
  public readonly unitName: string; // Product name or description

  @IsNumber()
  public readonly quantity: number; // Product quantity

  @IsNumber()
  public readonly unitPrice: number; // Unit price of the product
  @IsOptional()
  public readonly attachment?: File | null; // Optional attachment
  @IsOptional()
  @IsString()
  public readonly image?: string; // Optional image URL or path
  @IsString()
  public readonly notice: string;
  @IsString()
  public readonly SKUCode: string;
  @IsString()
  public readonly vat: string;
  
}
export class TenderQuotationsUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;
/*
  @IsNumber()
  public readonly value: number;

  @IsString()
  public readonly description: string; 
*/
  @IsEnum(TenderQuotationStatusEnum)
  public readonly status: TenderQuotationStatusEnum;

  @IsMongoId()
  public readonly userId: string;
  @IsMongoId()
  public readonly tenderId: string;

  @IsMongoId()
  public readonly companyId: string;

  @IsArray() 
  @Type(() => Product) 
  public readonly products: Product[];

  @IsString()
  public readonly paymentMethod: string;

  @IsString()
  public readonly DeadLineDate: string;

  @IsString()
  public readonly DeliveryMethod: string;
  @IsString()
  public readonly contactMethod: string;

  @IsNumber()
  public readonly deliverDays: number;
  @IsNumber()
  public readonly OpportunityNr: number;
}