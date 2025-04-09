import { IsMongoId } from "class-validator";

export class OrdersGetRequest {
  @IsMongoId()
  public readonly id: string;
}