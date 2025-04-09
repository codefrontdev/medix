import { IsMongoId } from "class-validator";

export class TenderQuotationsDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}