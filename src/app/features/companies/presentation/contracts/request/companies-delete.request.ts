import { IsMongoId } from "class-validator";

export class CompaniesDeleteRequest {
  @IsMongoId()
  public readonly id: string;
}