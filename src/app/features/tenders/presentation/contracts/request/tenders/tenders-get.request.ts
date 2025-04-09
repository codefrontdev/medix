import { IsMongoId } from "class-validator";

export class TendersGetRequest {
  @IsMongoId()
  public readonly id: string;
}