import { Product } from "src/app/features/tenders/domain/entities/tender-product";



export class TendersUpsertCommand {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly minValue: number,
    public readonly value: number,
    public readonly endDate: Date,
    public readonly deliverDate: Date,
    public readonly type: string,
    public readonly status?: string,
    public readonly categoriesIds?: string[],
    public readonly region?: string,
    public readonly city?: string,
    public readonly fileName?: string,
    public readonly fileDescription?: string,
    public readonly fileId?: string,
    public readonly attachmentName?: string,
    public readonly attachmentDescription?: string,
    public readonly attachmentId?: string,
    public readonly attachmentRequired?: boolean,
    public readonly attachmentDeliverDays?: number,
    public readonly receiveDocumentsType?: string,
    public readonly Paylater?: string,
    public readonly contactInfo?: string,
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly products: Product[] = [],
    public readonly TenderNr: number = 1000,
  ) { }
}
