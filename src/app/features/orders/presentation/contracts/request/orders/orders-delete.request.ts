import { IsMongoId } from "class-validator";

export class OrdersDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}