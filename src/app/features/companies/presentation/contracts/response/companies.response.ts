export class CompaniesResponse {
  private constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly nameEn?: string,
    public readonly website?: string,
    public readonly address?: string,
    public readonly contactInfo?: string,
  ) { }
}
