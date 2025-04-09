import { Company } from "../../domain/entities/company";

export class CompaniesGetResult {
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
    public readonly registrationExpirationDate?: Date,
    public readonly creationDate?: Date,
    public readonly placeOfIssue?: string,
    public readonly turnover?: number,
    public readonly type?: string,
    public readonly activities?: string,
    public readonly categoriesIds?: string[],
    public readonly logoMedia?: string, // Updated to URL
    public readonly authorizationFileUrl?: string, // New field
    public readonly registeringFileUrl?: string, // New field    
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

  public static create(
    id: string,
    nameAr: string,
    nameEn: string = null,
    website: string = null,
    address: string = null,
    region: string = null,
    city: string = null,
    registrationNumber: string,
    ownerType: string = null,
    stampedAuthorizationFormUrl: string = null, // Updated to URL
    registrationExpirationDate: Date = null,
    creationDate: Date = null,
    placeOfIssue: string = null,
    turnover: number = null,
    type: string = null,
    activities: string = null,
    categoriesIds: string[] = [],
    logoMedia: string = null, // Updated to URL
    authorizationFileUrl: string = null, // New field
    registeringFileUrl: string = null, // New field
    contactInfo: string = null,
    userId: string = '',
    taxInformation: string = null, // New field
    deliveryAddress: string = null, // New field
    employeesNumber: number = null, // New field
    CompanyNr: string = null, // New field
    itemNr: number = null, // New field
    orderNr: number = null, // New field
    TenderNr: number = null, // New field
    OpportunityNr: number = null, // New field
    
  ): CompaniesGetResult {
    return new CompaniesGetResult(
      id,
      nameAr,
      nameEn,
      website,
      address,
      region,
      city,
      registrationNumber,
      ownerType,
      stampedAuthorizationFormUrl, // Updated to URL
      registrationExpirationDate,
      creationDate ?? new Date(),
      placeOfIssue,
      turnover,
      type,
      activities,
      categoriesIds,
      logoMedia, // Updated to URL
      authorizationFileUrl, // New field
      registeringFileUrl, // New field      
      contactInfo,
      userId,
      taxInformation, // New field
      deliveryAddress, // New field
      employeesNumber, // New field
      CompanyNr, // New field
      itemNr, // New field
      orderNr, // New field
      TenderNr, // New field
      OpportunityNr, // New field
      
    );
  }

  public static createFromDomain(company: Company): CompaniesGetResult {
    return new CompaniesGetResult(
      company._id,
      company.nameAr,
      company.nameEn,
      company.website,
      company.address,
      company.region,
      company.city,
      company.registrationNumber,
      company.ownerType,
      company.stampedAuthorizationFormUrl, // Updated to URL
      company.registrationExpirationDate,
      company.creationDate ?? new Date(),
      company.placeOfIssue,
      company.turnover,
      company.type,
      company.activities,
      company.categoriesIds,
      company.logoMedia, // Updated to URL
      company.authorizationFileUrl, // New field
      company.registeringFileUrl, // New field
      company.contactInfo,
      company.userId,
      company.taxInformation, // New field
      company.deliveryAddress, // New field
      company.employeesNumber, // New field
      company.CompanyNr, // New field
      company.itemNr, // New field
      company.orderNr, // New field
      company.TenderNr, // New field
      company.OpportunityNr, // New field
      
    );
  }
}
