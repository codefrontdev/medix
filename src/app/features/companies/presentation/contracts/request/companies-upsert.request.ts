import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  IsArray,
  IsMongoId,
  IsUrl,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CompanyOwnerTypeEnum } from '../../../domain/constants/enums/company-owner-type.enum';
import { CompanyTypeEnum } from '../../../domain/constants/enums/company-type.enum';

export class CompaniesUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly nameAr: string;

  @IsString()
  @IsOptional()
  public readonly nameEn?: string;

  @IsUrl()
  @IsOptional()
  public readonly website?: string;

  @IsString()
  @IsOptional()
  public readonly address?: string;

  @IsString()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsOptional()
  public readonly city?: string;

  @IsString()
  public readonly registrationNumber: string;

  @IsEnum(CompanyOwnerTypeEnum)
  public readonly ownerType: string;

  @IsString()
  @IsOptional()
  public readonly stampedAuthorizationFormUrl?: string; // Updated field

  @IsString()
  @IsOptional()
  public readonly authorizationFileUrl?: string; // New field

  @IsString()
  @IsOptional()
  public readonly registeringFileUrl?: string; // New field

  @IsString()
  @IsOptional()
  public readonly logoMedia?: string; // Updated field

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public readonly registrationExpirationDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public readonly creationDate?: Date;

  @IsString()
  @IsOptional()
  public readonly placeOfIssue?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  public readonly turnover?: number;

  @IsEnum(CompanyTypeEnum)
  public readonly type: string;

  @IsString()
  @IsOptional()
  public readonly activities?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  public readonly categoriesIds?: string[];

  @IsString()
  @IsOptional()
  public readonly contactInfo?: string;

  @IsString()
  @IsOptional()
  public readonly taxInformation?: string; // New field

  @IsString()
  @IsOptional()
  public readonly deliveryAddress?: string; // New field

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly employeesNumber?: number; // New field
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly itemNr?: number; // New field
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly orderNr?: number; // New field
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly TenderNr?: number; // New field
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly OpportunityNr?: number; // New field
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly CompanyNr?: string; // New field
}
