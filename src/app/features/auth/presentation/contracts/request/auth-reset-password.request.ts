import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class AuthResetPasswordRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly code: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  public readonly newPassword: string;
}