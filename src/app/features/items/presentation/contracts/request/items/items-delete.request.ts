import { IsMongoId } from "class-validator";

export class ItemsDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}