import { IsMongoId } from "class-validator";

export class CompaniesGetRequest {
  @IsMongoId()
  public readonly id: string;
}