import { PaylaterTypeEnum } from "../../../domain/constants/enums/Paylater-type.enum";
import { ReceiveDocumentsTypeEnum } from "../../../domain/constants/enums/receive-documents-type.enum";

export class TendersGetAllResult {
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
    public readonly attachmentRequired: boolean = false,
    public readonly receiveDocumentsType: string = ReceiveDocumentsTypeEnum.BOTH,
    public readonly Paylater: string = PaylaterTypeEnum.NO,
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly TenderNr?: number,
  ) { }

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
    attachmentRequired: boolean = false,
    receiveDocumentsType: string = ReceiveDocumentsTypeEnum.BOTH,
    Paylater: string = PaylaterTypeEnum.NO,
    companyId: string = '',
    userId: string = '',
    TenderNr:number
  ): TendersGetAllResult {
    return new TendersGetAllResult(
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
      attachmentRequired,
      receiveDocumentsType,
      Paylater,
      companyId,
      userId,
      TenderNr
    );
  }
}
