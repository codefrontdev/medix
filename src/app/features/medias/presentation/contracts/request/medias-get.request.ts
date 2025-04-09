import { IsMongoId } from "class-validator";

export class MediasGetRequest {
  @IsMongoId()
  public readonly id: string;
}