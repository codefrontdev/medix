import { AggregateRoot } from '@nestjs/cqrs';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

export class Company extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public nameAr: string,
    public nameEn?: string,
    public website?: string,
    public address?: string,
    public region?: string,
    public city?: string,
    public registrationNumber: string = '',
    public ownerType?: string,
    public stampedAuthorizationFormUrl?: string, // Updated to URL
    public registrationExpirationDate?: Date,
    public creationDate?: Date,
    public placeOfIssue?: string,
    public turnover?: number,
    public type?: string,
    public activities?: string,
    public categoriesIds?: string[],
    public logoMedia?: string, // Updated to URL
    public authorizationFileUrl?: string, // New field
    public registeringFileUrl?: string, // New field
    public contactInfo?: string,
    public userId: string = '',
    public taxInformation?: string, // New field
    public deliveryAddress?: string, // New field
    public employeesNumber?: number, // New field
    public CompanyNr?: string, // New field
    public itemNr?: number, // New field
    public orderNr?: number, // New field
    public TenderNr?: number, // New field
    public OpportunityNr?: number, // New field    
    public readonly displayOrder: number = 0,
    public readonly isVisible: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string,
    public readonly deletedBy?: string,
  ) {
    super();
  }

  public static create(
    id: string | null,
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
    displayOrder: number = 0,
    isVisible: boolean = true,
    createdAt: Date = null,
    updatedAt: Date = null,
    deletedAt: Date = null,
    createdBy: string = null,
    updatedBy: string = null,
    deletedBy: string = null,
  ): Company {
    return new Company(
      createObjectIdAsString(id),
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
      displayOrder,
      isVisible,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
    );
  }
}
