import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class AuthRefreshRequest {
  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;
}