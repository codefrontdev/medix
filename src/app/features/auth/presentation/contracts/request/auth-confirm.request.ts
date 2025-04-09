import { IsEmail, IsString } from "class-validator";

export class AuthConfirmRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly code: string;
}