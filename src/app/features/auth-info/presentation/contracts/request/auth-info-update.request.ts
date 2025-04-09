import { Type } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { GenderEnum } from "src/app/@core/values/enums/gender.enum";
import { AccountTypeEnum } from "src/app/features/auth/@core/values/enums/account-type.enum";

export class AuthInfoUpdateRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly nickName: string;

  @IsString()
  @IsPhoneNumber()
  public readonly phoneNumber: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  public readonly gender?: string;

  @IsEnum(AccountTypeEnum)
  @IsOptional()
  public readonly accountType: string;

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