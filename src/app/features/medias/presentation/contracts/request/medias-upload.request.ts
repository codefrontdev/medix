import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";
import appTransforms from "src/app/@core/transform/app-transforms";

export class MediasUploadRequest {
  @IsBoolean()
  @Transform(appTransforms.booleanTransform)
  public readonly isProtected: boolean;
}
