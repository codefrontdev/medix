import { IsEmail, IsString } from "class-validator";

export class AuthResendConfirmCodeRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;
}