import { Injectable } from '@nestjs/common';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, fromObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { TenderQuotationSchema } from '../schemas/tender-quotation.schema';
import { TenderQuotation } from '../../domain/entities/tender-quotation';

@Injectable()
export class TenderQuotationSchemaFactory implements SchemaFactory<TenderQuotationSchema, TenderQuotation> {
  public create(
    entity: TenderQuotation,
  ): TenderQuotationSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
        /*
      value: entity.value,
      description: entity.description,
      */
      products: entity.products,
      paymentMethod: entity.paymentMethod,
      DeadLineDate: entity.DeadLineDate,
      DeliveryMethod: entity.DeliveryMethod,
      contactMethod: entity.contactMethod,
      deliverDays: entity.deliverDays,
      status: entity.status,
      tenderId:
        createObjectId(
          entity.tenderId,
        ),
      company: null,
      companyId:
        createObjectId(
          entity.companyId,
        ),
      userId:
        createObjectId(
          entity.userId,
        ),
      OpportunityNr: entity.OpportunityNr,
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
    entitySchema: TenderQuotationSchema,
  ): TenderQuotation {
    return new TenderQuotation(
      fromObjectId(
        entitySchema._id,
      ),
      /*entitySchema.value,
      entitySchema.description,*/
      entitySchema.products,
      entitySchema.paymentMethod,
      entitySchema.DeadLineDate,
      entitySchema.DeliveryMethod,
      entitySchema.contactMethod,
      entitySchema.deliverDays,
      entitySchema.status,
      fromObjectId(
        entitySchema.tenderId,
      ),
      fromObjectId(
        entitySchema.companyId,
      ),
      entitySchema.company,
      fromObjectId(
        entitySchema.userId,
      ),
      entitySchema.OpportunityNr,
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
