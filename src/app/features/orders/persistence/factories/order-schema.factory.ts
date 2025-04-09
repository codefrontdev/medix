import { Injectable } from '@nestjs/common';
import { OrderSchema } from '../schemas/order.schema';
import { Order } from '../../domain/entities/order';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, createObjectIds, fromObjectId, fromObjectIds } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class OrderSchemaFactory implements SchemaFactory<OrderSchema, Order> {
  public create(
    entity: Order,
  ): OrderSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      title: entity.title,
      endDate: entity.endDate,
      deliverDate: entity.deliverDate,
      type: entity.type,
      status: entity.status,
      region: entity.region,
      city: entity.city,
      address: entity.address,
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
      contactInfo: entity.contactInfo,
      tenderId:
        createObjectId(
          entity.tenderId,
        ),
        companyId:
        createObjectId(
          entity.companyId,
        ),
      userId:
        createObjectId(
          entity.userId,
        ),
      products:entity.products,
      Sendedproducts:entity.Sendedproducts,
      OrderNr: entity.OrderNr,
      DeliveryMethod: entity.DeliveryMethod,
      paymentMethod: entity.paymentMethod,
      invoices:entity.invoices,
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
    entitySchema: OrderSchema,
  ): Order {
    return new Order(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.title,
      entitySchema.endDate,
      entitySchema.deliverDate,
      entitySchema.type,
      entitySchema.status,
      entitySchema.region,
      entitySchema.city,
      entitySchema.address,
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
      entitySchema.contactInfo,
      fromObjectId(
        entitySchema.tenderId,
      ),
      fromObjectId(
        entitySchema.companyId,
      ),
      fromObjectId(
        entitySchema.userId,
      ),
      entitySchema.products,
      entitySchema.Sendedproducts,
      entitySchema.OrderNr,
      entitySchema.DeliveryMethod,
      entitySchema.paymentMethod,
      entitySchema.invoices,
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
