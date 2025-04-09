import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { OrdersRepository } from '../../persistence/repositories/orders.repository';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { Product } from '../../domain/entities/product';
import { Invoice } from '../../domain/entities/invoice';

@Injectable()
export class OrderFactory implements EntityFactory<Order> {
  public constructor(
    private readonly tendersRepository: OrdersRepository,
  ) { }

  public async save(
    id: string | null,
    title: string,
    endDate: Date,
    deliverDate: Date,
    type: string,
    status: string = null,
    region: string = '',
    city: string = '',
    address: string = '',
    fileName: string = '',
    fileDescription: string = '',
    fileId: string = null,
    attachmentName: string = '',
    attachmentDescription: string = '',
    attachmentId: string = null,
    attachmentRequired: boolean = false,
    attachmentDeliverDays: number = null,
    contactInfo: string = '',
    tenderId: string,
    companyId: string,
    userId: string,
    products: Product[] = [], // Add products parameter
    Sendedproducts: Product[] = [], // Add products parameter
    OrderNr: number = 0,
    DeliveryMethod: string,
    paymentMethod: string,
    invoices:Invoice[] = [],
  ): Promise<Order> {
    const isInsert = id === null;

    if (isInsert) {
      const entity =
      Order.create(
          createObjectIdAsString(id),
          title,
          endDate,
          deliverDate,
          type,
          status,
          region,
          city,
          address,
          fileName,
          fileDescription,
          fileId,
          attachmentName,
          attachmentDescription,
          attachmentId,
          attachmentRequired,
          attachmentDeliverDays,
          contactInfo,
          tenderId,
          companyId,
          userId,
          products, // Pass products when creating the entity
          Sendedproducts, // Pass products when creating the entity
          OrderNr,
          DeliveryMethod,
          paymentMethod,
          invoices
        );

      await this.tendersRepository.insert(entity);

      return entity;
    }

    const foundEntity = await this.tendersRepository.getById(id);

    if (foundEntity == null) {
      return null;
    }

    foundEntity.title = title;
    foundEntity.endDate = endDate;
    foundEntity.deliverDate = deliverDate;
    foundEntity.type = type;
    foundEntity.status = status;
    foundEntity.region = region;
    foundEntity.city = city;
    foundEntity.address = address;
    foundEntity.fileName = fileName;
    foundEntity.fileDescription = fileDescription;
    foundEntity.fileId = fileId;
    foundEntity.attachmentName = attachmentName;
    foundEntity.attachmentDescription = attachmentDescription;
    foundEntity.attachmentId = attachmentId;
    foundEntity.attachmentRequired = attachmentRequired;
    foundEntity.attachmentDeliverDays = attachmentDeliverDays;
    foundEntity.contactInfo = contactInfo;
    foundEntity.tenderId = tenderId;
    foundEntity.companyId = companyId;
    foundEntity.products = products; // Update products
    foundEntity.Sendedproducts = Sendedproducts; // Update products
    foundEntity.OrderNr = OrderNr; // Update products
    foundEntity.DeliveryMethod = DeliveryMethod;
    foundEntity.paymentMethod = paymentMethod;
    foundEntity.invoices = invoices;

    const updatedEntity = await this.tendersRepository.getAndUpdate(
      {
        _id: createObjectId(id),
      },
      foundEntity,
    );

    return updatedEntity;
  }
}
