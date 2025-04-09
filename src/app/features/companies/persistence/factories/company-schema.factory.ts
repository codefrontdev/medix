import { Injectable } from '@nestjs/common';
import { CompanySchema } from '../schemas/company.schema';
import { Company } from '../../domain/entities/company';
import { ObjectId } from 'mongodb';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, createObjectIds, fromObjectId, fromObjectIds } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class CompanySchemaFactory
  implements SchemaFactory<CompanySchema, Company> {
  public create(entity: Company): CompanySchema {
    return {
      _id: createObjectId(entity._id),
      nameAr: entity.nameAr,
      nameEn: entity.nameEn,
      website: entity.website,
      address: entity.address,
      region: entity.region,
      city: entity.city,
      registrationNumber: entity.registrationNumber,
      ownerType: entity.ownerType,
      stampedAuthorizationFormUrl: entity.stampedAuthorizationFormUrl, // Updated to URL
      registrationExpirationDate: entity.registrationExpirationDate,
      creationDate: entity.creationDate,
      placeOfIssue: entity.placeOfIssue,
      turnover: entity.turnover,
      type: entity.type,
      activities: entity.activities,
      categoriesIds: createObjectIds(entity.categoriesIds),
      logoMedia: entity.logoMedia, // Updated to URL
      authorizationFileUrl: entity.authorizationFileUrl, // New field
      registeringFileUrl: entity.registeringFileUrl, // New field
      contactInfo: entity.contactInfo,
      userId: createObjectId(entity.userId),
      taxInformation: entity.taxInformation, // New field
      deliveryAddress: entity.deliveryAddress, // New field
      employeesNumber: entity.employeesNumber, // New field      
      CompanyNr: entity.CompanyNr, // New field  
      itemNr: entity.itemNr, // New field      
      orderNr: entity.orderNr, // New field      
      TenderNr: entity.TenderNr, // New field      
      OpportunityNr: entity.OpportunityNr, // New field                
      displayOrder: entity.displayOrder,
      isVisible: entity.isVisible,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      deletedBy: entity.deletedBy,
    };
  }

  public createFromSchema(entitySchema: CompanySchema): Company {
    return new Company(
      fromObjectId(entitySchema._id),
      entitySchema.nameAr,
      entitySchema.nameEn,
      entitySchema.website,
      entitySchema.address,
      entitySchema.region,
      entitySchema.city,
      entitySchema.registrationNumber,
      entitySchema.ownerType,
      entitySchema.stampedAuthorizationFormUrl, // Updated to URL
      entitySchema.registrationExpirationDate,
      entitySchema.creationDate,
      entitySchema.placeOfIssue,
      entitySchema.turnover,
      entitySchema.type,
      entitySchema.activities,
      fromObjectIds(entitySchema.categoriesIds),
      entitySchema.logoMedia, // Updated to URL
      entitySchema.authorizationFileUrl, // New field
      entitySchema.registeringFileUrl, // New field
      entitySchema.contactInfo,
      fromObjectId(entitySchema.userId),
      entitySchema.taxInformation, // New field
      entitySchema.deliveryAddress, // New field
      entitySchema.employeesNumber, // New field      
      entitySchema.CompanyNr,
      entitySchema.itemNr, // New field      
      entitySchema.orderNr, // New field      
      entitySchema.TenderNr, // New field      
      entitySchema.OpportunityNr, // New field            
      entitySchema.displayOrder,
      entitySchema.isVisible,
      entitySchema.createdAt,
      entitySchema.updatedAt,
      entitySchema.deletedAt,
      entitySchema.createdBy,
      entitySchema.updatedBy,
      entitySchema.deletedBy,
    );
  }
}
