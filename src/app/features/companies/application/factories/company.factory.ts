import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { CompaniesRepository } from '../../persistence/repositories/companies.repository';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class CompanyFactory implements EntityFactory<Company> {
  public constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  public async save(
    id: string | null,
    nameAr: string,
    nameEn: string,
    website: string = '',
    address: string = '',
    region: string = '',
    city: string = '',
    registrationNumber: string = '',
    ownerType: string = '',
    stampedAuthorizationFormUrl: string = null, // Updated field
    registrationExpirationDate: Date = null,
    creationDate: Date = null,
    placeOfIssue: string = '',
    turnover: number = null,
    type: string = '',
    activities: string = '',
    categoriesIds: string[] = [],
    logoMedia: string = null, // Updated field
    authorizationFileUrl: string = null, // New field
    registeringFileUrl: string = null, // New field
    contactInfo: string = '',
    userId: string,
    taxInformation: string = '', // New field
    deliveryAddress: string = '', // New field
    employeesNumber: number = null, // New field
    CompanyNr: string = '0000000', // New field
    itemNr: number = 0, // New field
    orderNr: number = 0, // New field
    TenderNr: number = 0, // New field
    OpportunityNr: number = 0, // New field
    
  ): Promise<Company> {
    const isInsert = id === null || id === '' || id === 'null';
    if (isInsert) {
      const entity = Company.create(
        createObjectIdAsString(null),
        nameAr,
        nameEn,
        website,
        address,
        region,
        city,
        registrationNumber,
        ownerType,
        stampedAuthorizationFormUrl, // Use URL
        registrationExpirationDate,
        creationDate ?? new Date(),
        placeOfIssue,
        turnover,
        type,
        activities,
        categoriesIds,
        logoMedia, // Use URL
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

      await this.companiesRepository.insert(entity);

      return entity;
    }

    const foundEntity = await this.companiesRepository.getById(id);

    if (foundEntity == null) {
      return null;
    }

    foundEntity.nameAr = nameAr;
    foundEntity.nameEn = nameEn;
    foundEntity.website = website;
    foundEntity.address = address;
    foundEntity.region = region;
    foundEntity.city = city;
    foundEntity.registrationNumber = registrationNumber;
    foundEntity.ownerType = ownerType;
    foundEntity.stampedAuthorizationFormUrl = stampedAuthorizationFormUrl; // Use URL
    foundEntity.registrationExpirationDate = registrationExpirationDate;
    foundEntity.creationDate = creationDate ?? new Date();
    foundEntity.placeOfIssue = placeOfIssue;
    foundEntity.turnover = turnover;
    foundEntity.type = type;
    foundEntity.activities = activities;
    foundEntity.categoriesIds = categoriesIds;
    foundEntity.logoMedia = logoMedia; // Use URL
    foundEntity.authorizationFileUrl = authorizationFileUrl; // New field
    foundEntity.registeringFileUrl = registeringFileUrl; // New field
    foundEntity.contactInfo = contactInfo;
    foundEntity.userId = userId;
    foundEntity.taxInformation = taxInformation; // New field
    foundEntity.deliveryAddress = deliveryAddress; // New field
    foundEntity.employeesNumber = employeesNumber; // New field
    foundEntity.CompanyNr = CompanyNr; // New field
    foundEntity.itemNr = itemNr; // New field
    foundEntity.orderNr = orderNr; // New field
    foundEntity.TenderNr = TenderNr; // New field
    foundEntity.OpportunityNr = OpportunityNr; // New field
    
    

    const updatedEntity = await this.companiesRepository.getAndUpdate(
      {
        _id: createObjectId(id),
      },
      foundEntity,
    );

    return updatedEntity;
  }
}
