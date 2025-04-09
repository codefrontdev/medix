// ------------------------------- Response -------------------------------

import { Transform } from "class-transformer";
import { IsAlpha, IsBoolean, IsNumber, IsString } from "class-validator";
import { optional } from "joi";
import appTransforms from "src/app/@core/transform/app-transforms";

export class AppPagingRequest {
  @IsNumber()
  @Transform(appTransforms.intTransform)
  public readonly pageSize: number;

  @IsNumber()
  @Transform(appTransforms.intTransform)
  public readonly pageNumber: number;

  @IsBoolean()
  @Transform(appTransforms.booleanTransform)
  public readonly withPaging: boolean;

}