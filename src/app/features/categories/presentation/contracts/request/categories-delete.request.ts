import { IsMongoId, IsString } from "class-validator";

export class CategoriesDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}