import { AggregateRoot } from '@nestjs/cqrs';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { ReceiveDocumentsTypeEnum } from '../constants/enums/receive-documents-type.enum';
import { Category } from 'src/app/features/categories/domain/entities/category';
import { TenderStatusEnum } from '../constants/enums/tender-status.enum';
import { PaylaterTypeEnum } from '../constants/enums/Paylater-type.enum';
import { Product } from './tender-product';



export class Tender extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public title: string,
    public minValue: number,
    public value: number,
    public endDate: Date,
    public deliverDate: Date,
    public type: string,
    public status: string = TenderStatusEnum.PLANING,
    public categoriesIds: string[] = [],
    public categories: Category[] = [],
    public region?: string,
    public city?: string,
    public fileName?: string,
    public fileDescription?: string,
    public fileId?: string,
    public attachmentName?: string,
    public attachmentDescription?: string,
    public attachmentId?: string,
    public attachmentRequired: boolean = false,
    public attachmentDeliverDays?: number,
    public receiveDocumentsType: string = ReceiveDocumentsTypeEnum.BOTH,
    public Paylater: string =PaylaterTypeEnum.NO,
    public contactInfo?: string,
    public companyId: string = '',
    public userId: string = '',
    public products: Product[] = [] ,
    public TenderNr: number = 1000 ,
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
    title: string,
    minValue: number,
    value: number,
    endDate: Date,
    deliverDate: Date,
    type: string,
    status: string = TenderStatusEnum.PLANING,
    categoriesIds: string[] = [],
    categories: Category[] = [],
    region: string = null,
    city: string = null,
    fileName: string = null,
    fileDescription: string = null,
    fileId: string = null,
    attachmentName: string = null,
    attachmentDescription: string = null,
    attachmentId: string = null,
    attachmentRequired: boolean = false,
    attachmentDeliverDays: number = null,
    receiveDocumentsType: string = ReceiveDocumentsTypeEnum.BOTH,
    Paylater: string = PaylaterTypeEnum.NO,
    contactInfo: string = null,
    companyId: string = '',
    userId: string = '',
    products: Product[] = [],
    TenderNr:number = 1000,
    displayOrder: number = 0,
    isVisible: boolean = true,
    createdAt: Date = null,
    updatedAt: Date = null,
    deletedAt: Date = null,
    createdBy: string = null,
    updatedBy: string = null,
    deletedBy: string = null,
    
  ): Tender {
    return new Tender(
      createObjectIdAsString(
        id,
      ),
      title,
      minValue,
      value,
      endDate, 
      deliverDate,
      type,
      status,
      categoriesIds,
      categories,
      region,
      city,
      fileName,
      fileDescription,
      fileId,
      attachmentName,
      attachmentDescription,
      attachmentId,
      attachmentRequired,
      attachmentDeliverDays,
      receiveDocumentsType,
      Paylater,
      contactInfo,
      companyId,
      userId,
      products,
      TenderNr,
      displayOrder,
      isVisible,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy       
    );
  }
}