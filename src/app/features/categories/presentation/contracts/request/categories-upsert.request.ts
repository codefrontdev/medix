import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CategoriesUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly name: string;
  @IsString()
  public readonly TagName: string;

  @IsMongoId()
  @IsString()
  @IsOptional()
  public readonly parentId?: string;

  @IsNumber()
  public readonly displayOrder: number;
}