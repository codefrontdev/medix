import { IsMongoId } from "class-validator";

export class ItemsGetRequest {
  @IsMongoId()
  public readonly id: string;
}