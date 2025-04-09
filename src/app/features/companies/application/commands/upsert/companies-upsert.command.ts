export class CompaniesUpsertCommand {
  public constructor(
    public readonly id: string,
    public readonly nameAr: string,
    public readonly nameEn: string,
    public readonly website?: string,
    public readonly address?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly registrationNumber?: string,
    public readonly ownerType?: string,
    public readonly stampedAuthorizationFormUrl?: string, // Updated: URL for stamped authorization form
    public readonly registrationExpirationDate?: Date,
    public readonly creationDate?: Date,
    public readonly placeOfIssue?: string,
    public readonly turnover?: number,
    public readonly type?: string,
    public readonly activities?: string,
    public readonly categoriesIds?: string[],
    public readonly logoMedia?: string, // Updated: URL for logo media
    public readonly authorizationFileUrl?: string, // New: URL for authorization file
    public readonly registeringFileUrl?: string, // New: URL for registering file
    public readonly contactInfo?: string,
    public readonly userId: string = '',
    public readonly taxInformation?: string, // New: Tax information
    public readonly deliveryAddress?: string, // New: Delivery address
    public readonly employeesNumber?: number, // New: Number of employees
    public readonly CompanyNr?: string, // New: Number of CompanyNr    
    public readonly itemNr?: number, // New: Number of employees   
    public readonly orderNr?: number, // New: Number of employees   
    public readonly TenderNr?: number, // New: Number of employees   
    public readonly OpportunityNr?: number, // New: Number of employees   
      
  ) {}
}
