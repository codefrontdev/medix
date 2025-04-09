import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { TenderQuotation } from '../../domain/entities/tender-quotation';
import { TenderQuotationsRepository } from '../../persistence/repositories/tender-quotations.repository';
import { TenderQuotationStatusEnum } from '../../domain/constants/enums/tender-quotation-status.enum';
import { ObjectId } from 'mongoose';
import { Product } from '../../domain/entities/product';


@Injectable()
export class TenderQuotationFactory implements EntityFactory<TenderQuotation> {
  public constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
  ) { }

  public async save(
    id: string | null,
    /*value: number,
    description: string,
    */
    products: Product[] = [],
    paymentMethod: string,
    DeadLineDate: string,
    DeliveryMethod: string,
    contactMethod: string,
    deliverDays: number,
    status: string = TenderQuotationStatusEnum.PENDING,
    tenderId: string,
    companyId: string,
    userId: string,
    OpportunityNr:number
  ): Promise<TenderQuotation> {
    const isInsert = id === null;

    if (isInsert) {
      const entity =
        TenderQuotation
          .create(
            createObjectIdAsString(
              id,
            ),
            /*
            value,
            description,
            */
            products,
            paymentMethod,
            DeadLineDate,
            DeliveryMethod,
            contactMethod,
            deliverDays,
            status,
            tenderId,
            companyId,
            null,
            userId,
            OpportunityNr
          );

      await this
        .tenderQuotationsRepository
        .insert(
          entity,
        );

      return entity;
    }

    const foundEntity =
      await this
        .tenderQuotationsRepository
        .getById(
          id,
        );

    if (foundEntity == null) {
      return null;
    }

    /*foundEntity.value = value;
    foundEntity.description = description;*/
    foundEntity.products = products;
    foundEntity.paymentMethod = paymentMethod;
    foundEntity.DeadLineDate = DeadLineDate;
    foundEntity.DeliveryMethod = DeliveryMethod;
    foundEntity.contactMethod = contactMethod;
    foundEntity.deliverDays = deliverDays;
    foundEntity.status = status;
    foundEntity.tenderId = tenderId;
    foundEntity.companyId = companyId;

    const updatedEntity =
      await this
        .tenderQuotationsRepository
        .getAndUpdate(
          {
            _id:
              createObjectId(
                id,
              ),
          },
          foundEntity,
        );

    return updatedEntity;
  }
}