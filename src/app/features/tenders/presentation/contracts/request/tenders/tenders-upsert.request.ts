/** @format */

import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  IsArray,
  IsMongoId,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { TenderTypeEnum } from "../../../../domain/constants/enums/tender-type.enum";
import { TenderStatusEnum } from "../../../../domain/constants/enums/tender-status.enum";
import { ReceiveDocumentsTypeEnum } from "../../../../domain/constants/enums/receive-documents-type.enum";
import { PaylaterTypeEnum } from "src/app/features/tenders/domain/constants/enums/Paylater-type.enum";

class Product {
  @IsString()
  public readonly item: string;

  @IsNumber()
  public readonly quantity: number;
  @IsNumber()
  public readonly unit: string;

  @IsOptional() // Optional if the attachment can be null
  public readonly attachment?: File | null; // Assuming you handle File types accordingly
  @IsString()
  public readonly notice: string;
}

export class TendersUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly title: string;

  @IsNumber()
  public readonly minValue: number;

  @IsNumber()
  public readonly value: number;

  @IsDate()
  @Type(() => Date)
  public readonly endDate: Date;

  @IsDate()
  @Type(() => Date)
  public readonly deliverDate: Date;

  @IsEnum(TenderTypeEnum)
  public readonly type: TenderTypeEnum;

  @IsEnum(TenderStatusEnum)
  @IsOptional()
  public readonly status?: TenderStatusEnum;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  @IsOptional()
  public readonly categoriesIds?: string[];

  @IsString()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsOptional()
  public readonly city?: string;

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

  @IsEnum(ReceiveDocumentsTypeEnum)
  public readonly receiveDocumentsType: ReceiveDocumentsTypeEnum;

  @IsEnum(PaylaterTypeEnum)
  public readonly Paylater: PaylaterTypeEnum;

  @IsString()
  @IsOptional()
  public readonly contactInfo?: string;

  @IsMongoId()
  @IsOptional()
  public readonly companyId?: string;

  @IsArray()
  @Type(() => Product)
  public readonly products: Product[];
  @IsNumber()
  public readonly TenderNr: number;
}
