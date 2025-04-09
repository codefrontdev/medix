import { Invoice } from "src/app/features/orders/domain/entities/invoice";
import { Product } from "src/app/features/orders/domain/entities/product";

export class OrdersUpsertCommand {
  public constructor(
    public readonly id: string | null,
    public readonly title: string,
    public readonly endDate: Date,
    public readonly deliverDate: Date,
    public readonly type: string,
    public readonly status?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly address?: string,
    public readonly fileName?: string,
    public readonly fileDescription?: string,
    public readonly fileId?: string,
    public readonly attachmentName?: string,
    public readonly attachmentDescription?: string,
    public readonly attachmentId?: string,
    public readonly attachmentRequired?: boolean,
    public readonly attachmentDeliverDays?: number,
    public readonly contactInfo?: string,
    public readonly tenderId: string = '',
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly products: Product[] = [],
    public readonly Sendedproducts: Product[] = [],
    public readonly OrderNr: number = 0,
    public readonly DeliveryMethod: string = '',
    public readonly paymentMethod: string = '',
    public readonly invoices: Invoice[] = [],
  ) { }
}
