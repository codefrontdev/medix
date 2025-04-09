export class CompaniesGetAllResult {
  private constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly nameEn?: string,
    public readonly registrationNumber: string = '',
    public readonly ownerType?: string,
    public readonly CompanyNr?: string,
  ) { }

  public static create(
    id: string,
    nameAr: string,
    nameEn: string = null,
    registrationNumber: string,
    ownerType: string = null,
    CompanyNr: string = null,
  ): CompaniesGetAllResult {
    return new CompaniesGetAllResult(
      id,
      nameAr,
      nameEn,
      registrationNumber,
      ownerType,
      CompanyNr
    );
  }
}
