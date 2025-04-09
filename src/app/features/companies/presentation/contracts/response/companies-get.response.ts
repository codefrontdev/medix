export class CompaniesGetResponse {
  private constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly nameEn?: string,
    public readonly website?: string,
    public readonly address?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly registrationNumber: string = '',
    public readonly ownerType?: string,
    public readonly stampedAuthorizationFormUrl?: string, // Updated to URL
    public readonly authorizationFileUrl?: string, // New field
    public readonly registeringFileUrl?: string, // New field
    public readonly registrationExpirationDate?: Date,
    public readonly creationDate?: Date,
    public readonly placeOfIssue?: string,
    public readonly turnover?: number,
    public readonly type?: string,
    public readonly activities?: string,
    public readonly categoriesIds?: string[],
    public readonly logoMedia?: string, // Updated to URL
    public readonly contactInfo?: string,
    public readonly userId: string = '',
    public readonly taxInformation?: string, // New field
    public readonly deliveryAddress?: string, // New field
    public readonly employeesNumber?: number, // New field
    public readonly CompanyNr?: string, // New field
    public readonly itemNr?: number, // New field
    public readonly orderNr?: number, // New field
    public readonly TenderNr?: number, // New field
    public readonly OpportunityNr?: number, // New field
    
  ) {}
}
