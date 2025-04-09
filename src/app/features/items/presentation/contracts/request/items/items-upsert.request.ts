import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type,Transform  } from 'class-transformer';
import { ItemTypeEnum } from '../../../../domain/constants/enum/item-type.enum';
import { ItemStatusEnum } from 'src/app/features/items/domain/constants/enum/item-status-enum';

export class Attachment {
  @IsString()
  public readonly name: string; // Required

  @IsString()
  public readonly description: string; // Required

  @IsOptional()
  @IsMongoId()
  public readonly fileId?: string; // Optional

  @IsOptional()
  public readonly file?: Express.Multer.File; // Optional

  @IsOptional()
  @IsString()
  public readonly filepath?: string; // Optional

  constructor(
    name: string,
    description: string,
    fileId?: string,
    file?: Express.Multer.File,
    filepath?: string
  ) {
    this.name = name;
    this.description = description;
    this.fileId = fileId;
    this.file = file;
    this.filepath = filepath;
  }
}

export class ItemsUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string; // Optional for inserts, required for updates

  @IsString()
  public readonly name: string; // Name of the item
  @IsString()
  public readonly SKUCode: string; // Name of the item
  @IsString()
  public readonly manufacturer: string; // Name of the item
  @IsString()
  public readonly brand: string; // Name of the item
  @IsString()
  public readonly model: string; // Name of the item
  @IsString()
  public readonly unit: string; // Name of the item
  @IsString()
  public readonly categories: string; // Name of the item

  @IsString()
  @IsOptional()
  public readonly description?: string; // Description of the item

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  public readonly price: number; // Price of the item

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== '' ? parseFloat(value) : null)) // Convert to number or null
  public readonly vat?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public readonly stock?: number; // Optional stock quantity

  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value)) // Parse comma-separated string
  @IsString({ each: true })
  @IsOptional()
  public readonly tags?: string[]; // Tags for categorization

  @IsString()
  @IsOptional()
  public readonly image?: string; // Optional image URL

  @IsArray()
  @Type(() => Attachment)
  @IsOptional()
  public readonly attachments: Attachment[]; // Array of attachments

  @IsEnum(ItemStatusEnum)
  @IsOptional()
  public readonly status?: ItemStatusEnum; // Status of the item

  @IsEnum(ItemTypeEnum)
  public readonly type: ItemTypeEnum; // Type of the item (e.g., Machine, Service)

  @IsMongoId()
  public readonly companyId: string; // ID of the associated company

  @IsMongoId()
  public readonly userId: string; // ID of the user performing the action
  
  @IsNumber()
  public readonly ItemNR: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  public readonly isVisible?: boolean; // Optional visibility flag
}
