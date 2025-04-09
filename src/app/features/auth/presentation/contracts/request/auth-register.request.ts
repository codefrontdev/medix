import { IsBoolean, IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";
import { RoleEnum } from "../../../@core/values/enums/role.enum";

export class AuthRegisterRequest {
  @IsString()
  public readonly nickName: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  // @IsString()
  // @IsPhoneNumber()
  // public readonly phoneNumber: string;

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
  public readonly password: string;

  @IsString()
   public readonly role: string;
}