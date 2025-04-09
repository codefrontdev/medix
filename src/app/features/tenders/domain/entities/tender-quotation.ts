import { AggregateRoot } from '@nestjs/cqrs';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { TenderQuotationStatusEnum } from '../constants/enums/tender-quotation-status.enum';
import { Company } from 'src/app/features/companies/domain/entities/company';
import { ObjectId } from 'mongoose';
import { Product } from './product';

export class TenderQuotation extends AggregateRoot {
  public constructor(
    public readonly _id: string,
   /*
    public readonly value: number,
    public readonly description: string,
    */
    public products: Product[] = [],
    public paymentMethod: string,
    public DeadLineDate: string,
    public DeliveryMethod: string,
    public contactMethod: string,
    public deliverDays: number,
    public status: string = TenderQuotationStatusEnum.PENDING,
    public tenderId: string = '',
    public companyId: string = '',
    public company: Company | null,
    public userId: string = '',
    public readonly OpportunityNr: number = 0,
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
    /*
    value: number,
    description: string,
    */
    products: Product[] = [],
    paymentMethod: string,
    DeadLineDate: string,
    DeliveryMethod: string,
    contactMethod: string,
    deliverDays: number,
    status: string = TenderQuotationStatusEnum.PENDING,
    tenderId: string = '',
    companyId: string = '',
    company: Company | null,
    userId: string = '',
    OpportunityNr: number = 0,
    displayOrder: number = 0,
    isVisible: boolean = true,
    createdAt: Date = null,
    updatedAt: Date = null,
    deletedAt: Date = null,
    createdBy: string = null,
    updatedBy: string = null,
    deletedBy: string = null,
  ): TenderQuotation {
    return new TenderQuotation(
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
      company,
      userId,
      OpportunityNr,
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