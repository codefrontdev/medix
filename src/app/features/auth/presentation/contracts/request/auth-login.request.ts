import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class AuthLoginRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;

  // @IsString()
  // @IsPhoneNumber()
  // public readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  // @IsBoolean()
  // public readonly byEmail: boolean;
}