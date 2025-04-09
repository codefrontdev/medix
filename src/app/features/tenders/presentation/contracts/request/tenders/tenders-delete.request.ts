import { IsMongoId } from "class-validator";

export class TendersDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}