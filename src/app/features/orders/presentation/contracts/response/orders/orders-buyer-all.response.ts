import { Tender } from "src/app/features/tenders/domain/entities/tender";
import { Product } from "./orders-get.response";
import { Company } from "src/app/features/companies/domain/entities/company";
import { Invoice } from "src/app/features/orders/domain/entities/invoice";

export class OrdersGetAllBResponse {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly endDate: Date,
    public readonly deliverDate: Date,
    public readonly type: string,
    public readonly status?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly address?: string,
    public readonly attachmentRequired: boolean = false,
    public readonly tenderId: string = '',
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly products: Product[] = [],
    public readonly Sendedproducts: Product[] = [],
    public readonly OrderNr: number = 0,
    public readonly DeliveryMethod: string = '',
    public readonly paymentMethod: string = '',
    public readonly invoices: Invoice[] = [],
    public readonly tender: Tender = null,
    public readonly company: Company = null,
  ) { }

  public static create(
    id: string,
    title: string,
    endDate: Date,
    deliverDate: Date,
    type: string,
    status: string = null,
    region: string = null,
    city: string = null,
    address: string = null,
    attachmentRequired: boolean = false,
    tenderId: string = '',
    companyId: string = '',
    userId: string = '',
    products: Product[] = [],
    Sendedproducts: Product[] = [],
    OrderNr: number = 0,
    DeliveryMethod: string = '',
    paymentMethod: string = '',
    invoices: Invoice[] =[],
    tender: Tender = null,
    company: Company = null,
  ): OrdersGetAllBResponse {
    return new OrdersGetAllBResponse(
      id,
      title,
      endDate,
      deliverDate,
      type,
      status,
      region,
      city,
      address,
      attachmentRequired,
      tenderId,
      companyId,
      userId,
      products,
      Sendedproducts,
      OrderNr,
      DeliveryMethod,
      paymentMethod,
      invoices,
      tender,
      company
    );
  }
}
