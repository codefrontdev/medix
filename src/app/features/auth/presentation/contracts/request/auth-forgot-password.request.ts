import { IsEmail, IsString } from "class-validator";

export class AuthForgotPasswordRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;
}