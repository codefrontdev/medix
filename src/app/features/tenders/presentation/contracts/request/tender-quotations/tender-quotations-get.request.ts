import { IsMongoId } from "class-validator";

export class TenderQuotationsGetRequest {
  @IsMongoId()
  public readonly id: string;
}