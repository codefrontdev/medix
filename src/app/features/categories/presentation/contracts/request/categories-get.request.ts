import { IsMongoId } from "class-validator";

export class CategoriesGetRequest {
  @IsMongoId()
  public readonly id: string;
}