import { Company } from "../../domain/entities/company";

export class CompaniesResult {
  private constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly CompanyNr: string,
    public readonly nameEn?: string,
    public readonly website?: string,
    public readonly address?: string,
    public readonly contactInfo?: string,
  ) { }

  public static createFromDomain(
    company: Company,
  ): CompaniesResult {
    return new CompaniesResult(
      company._id,
      company.nameAr,
      company.CompanyNr,
      company.nameEn,
      company.website,
      company.address,
      company.contactInfo,
      
    );
  }
}
