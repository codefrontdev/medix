import { IsBoolean, IsString } from "class-validator";

export class UsersVerifyRequest {
  @IsString()
  public readonly id: string;

  @IsBoolean()
  public readonly isVerified: boolean;
}