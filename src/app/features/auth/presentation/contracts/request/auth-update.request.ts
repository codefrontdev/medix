import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";
import { number } from "joi";
import { GenderEnum } from "src/app/@core/values/enums/gender.enum";
import { AccountTypeEnum } from "src/app/features/auth/@core/values/enums/account-type.enum";
import { RoleEnum } from "src/app/features/auth/@core/values/enums/role.enum";
import { identityTypeEnum } from "../../../@core/values/enums/identityTypeEnum";

export class AuthsUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly nickName: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  //@IsPhoneNumber()
  public readonly phoneNumber: string;

  /*@IsString()
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
  public readonly password: string;*/

  @IsEnum(RoleEnum)
  public readonly role: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  public readonly gender?: string;

  @IsEnum(AccountTypeEnum)
  @IsOptional()
  public readonly accountType: string;

  @IsEnum(identityTypeEnum)
  @IsOptional()
  public readonly identityType: string;

  @IsString()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsOptional()
  public readonly city?: string;
  @IsString()
  @IsOptional()
  public readonly address?: string;

  @IsString()
  @IsOptional()
  public readonly identityNo?: string;

  @IsString()
  @IsOptional()
  public readonly residenceNo?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public readonly dateOfBirth?: Date;
}