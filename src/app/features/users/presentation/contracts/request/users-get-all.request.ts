import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { AppPagingRequest } from "src/app/@core/shared/presentation/contracts/request/app-paging.request";
import appTransforms from "src/app/@core/transform/app-transforms";

export class UsersGetAllRequest extends AppPagingRequest {
  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly search?: string | null = null;

  @IsString()
  @IsOptional()
  @Transform(appTransforms.stringTransform)
  public readonly role?: string | null = null;
}