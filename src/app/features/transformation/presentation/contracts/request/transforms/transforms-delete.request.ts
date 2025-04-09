import { IsMongoId } from "class-validator";

export class TransformsDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}