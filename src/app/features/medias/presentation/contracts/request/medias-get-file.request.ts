import { IsString } from "class-validator";

export class MediasGetFileRequest {
  @IsString()
  public readonly id: string;
}