import { IsMongoId } from "class-validator";

export class UsersGetRequest {
  @IsMongoId()
  public readonly id: string;
}