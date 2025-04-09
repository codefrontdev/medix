import { IsMongoId } from "class-validator";

export class TransformsGetRequest {
  @IsMongoId()
  public readonly id: string;
}