import { Company } from 'src/app/features/companies/domain/entities/company';
import { PaylaterTypeEnum } from '../../../domain/constants/enums/Paylater-type.enum';
import { ReceiveDocumentsTypeEnum } from '../../../domain/constants/enums/receive-documents-type.enum';
import { Product } from '../../../domain/entities/tender-product';
import { Tender } from "src/app/features/tenders/domain/entities/tender";




export class TendersGetResult {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly minValue: number,
    public readonly value: number,
    public readonly endDate: Date,
    public readonly deliverDate: Date,
    public readonly type: string,
    public readonly status?: string,
    public readonly categoriesIds: string[] = [],
    public readonly categories: string[] = [],
    public readonly region?: string,
    public readonly city?: string,
    public readonly fileName?: string,
    public readonly fileDescription?: string,
    public readonly fileId?: string,
    public readonly attachmentName?: string,
    public readonly attachmentDescription?: string,
    public readonly attachmentId?: string,
    public readonly attachmentRequired: boolean = false,
    public readonly attachmentDeliverDays?: number,
    public readonly receiveDocumentsType: string = ReceiveDocumentsTypeEnum.BOTH,
    public readonly Paylater: string = PaylaterTypeEnum.NO,
    public readonly contactInfo?: string,
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly products: Product[] = [],
    public readonly TenderNr: number = 0,
  ) {
  }

  public static create(
    id: string,
    title: string,
    minValue: number,
    value: number,
    endDate: Date,
    deliverDate: Date,
    type: string,
    status: string = null,
    categoriesIds: string[] = [],
    categories: string[] = [],
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
  ): TendersGetResult {
    return new TendersGetResult(
      id,
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
      TenderNr
    );
  }
}
