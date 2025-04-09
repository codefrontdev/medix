import { IsMongoId } from "class-validator";

export class UsersDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}