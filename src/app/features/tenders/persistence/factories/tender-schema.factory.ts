import { Injectable } from '@nestjs/common';
import { TenderSchema } from '../schemas/tender.schema';
import { Tender } from '../../domain/entities/tender';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, createObjectIds, fromObjectId, fromObjectIds } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class TenderSchemaFactory implements SchemaFactory<TenderSchema, Tender> {
  public create(
    entity: Tender,
  ): TenderSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      title: entity.title,
      minValue: entity.minValue,
      value: entity.value,
      endDate: entity.endDate,
      deliverDate: entity.deliverDate,
      type: entity.type,
      status: entity.status,
      categoriesIds:
        createObjectIds(
          entity.categoriesIds,
        ),
      categories: null,
      region: entity.region,
      city: entity.city,
      fileName: entity.fileName,
      fileDescription: entity.fileDescription,
      fileId:
        createObjectId(
          entity.fileId,
        ),
      attachmentName: entity.attachmentName,
      attachmentDescription: entity.attachmentDescription,
      attachmentId:
        createObjectId(
          entity.attachmentId,
        ),
      attachmentRequired: entity.attachmentRequired,
      attachmentDeliverDays: entity.attachmentDeliverDays,
      receiveDocumentsType: entity.receiveDocumentsType,
      Paylater: entity.Paylater,
      contactInfo: entity.contactInfo,
      companyId:
        createObjectId(
          entity.companyId,
        ),
      userId:
        createObjectId(
          entity.userId,
        ),
      products:entity.products,
      TenderNr:entity.TenderNr,
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

  public createFromSchema(
    entitySchema: TenderSchema,
  ): Tender {
    return new Tender(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.title,
      entitySchema.minValue,
      entitySchema.value,
      entitySchema.endDate,
      entitySchema.deliverDate,
      entitySchema.type,
      entitySchema.status,
      fromObjectIds(
        entitySchema.categoriesIds,
      ),
      entitySchema.categories,
      entitySchema.region,
      entitySchema.city,
      entitySchema.fileName,
      entitySchema.fileDescription,
      fromObjectId(
        entitySchema.fileId,
      ),
      entitySchema.attachmentName,
      entitySchema.attachmentDescription,
      fromObjectId(
        entitySchema.attachmentId,
      ),
      entitySchema.attachmentRequired,
      entitySchema.attachmentDeliverDays,
      entitySchema.receiveDocumentsType,
      entitySchema.Paylater,
      entitySchema.contactInfo,
      fromObjectId(
        entitySchema.companyId,
      ),
      fromObjectId(
        entitySchema.userId,
      ),
      entitySchema.products,
      entitySchema.TenderNr,
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
