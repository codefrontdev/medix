import { IsEmail, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { GenderEnum } from "src/app/@core/values/enums/gender.enum";
import { AccountTypeEnum } from "src/app/features/auth/@core/values/enums/account-type.enum";
import { RoleEnum } from "src/app/features/auth/@core/values/enums/role.enum";

export class UsersUpsertRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly nickName: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly phoneNumber: string;

  @IsEnum(RoleEnum)
  public readonly role: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  public readonly gender?: string;

  @IsEnum(AccountTypeEnum)
  @IsOptional()
  public readonly accountType?: string;

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
  public readonly identityType?: string;

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
