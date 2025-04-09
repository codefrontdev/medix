export class CompaniesGetAllResponse {
  private constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly nameEn?: string,
    public readonly registrationNumber: string = '',
    public readonly ownerType?: string,
    public readonly CompanyNr?: string,
  ) { }
}
