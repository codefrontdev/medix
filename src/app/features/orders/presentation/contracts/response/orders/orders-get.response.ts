import { Company } from "src/app/features/companies/domain/entities/company";
import { Invoice } from "src/app/features/orders/domain/entities/invoice";
import { Tender } from "src/app/features/tenders/domain/entities/tender";

export class Product {
  constructor(
    public readonly itemId: string,
    public readonly item: string,
    public readonly quantity: number,
    public readonly price: number,
    public readonly discount: number,
    public readonly notice?: string,
    public readonly image?: string,
    public readonly attachment?: File | null, // Assuming you handle File types accordingly
    public readonly SKUCode?: string,
    public readonly vat?: string,
  ) {}
}

export class OrdersGetResponse {
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
    public readonly fileName?: string,
    public readonly fileDescription?: string,
    public readonly fileId?: string,
    public readonly attachmentName?: string,
    public readonly attachmentDescription?: string,
    public readonly attachmentId?: string,
    public readonly attachmentRequired: boolean = false,
    public readonly attachmentDeliverDays?: number,
    public readonly contactInfo?: string,
    public readonly tenderId: string = '',
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly products: Product[] = [], // Add products property
    public readonly Sendedproducts: Product[] = [], // Add products property
    public readonly OrderNr: number = 0,
    public readonly DeliveryMethod: string = '',
    public readonly paymentMethod: string = '',
    public readonly invoices: Invoice[] = [],
    public readonly Tender: Tender = null,
    public readonly company: Company = null,
  ) {}

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
    fileName: string = null,
    fileDescription: string = null,
    fileId: string = null,
    attachmentName: string = null,
    attachmentDescription: string = null,
    attachmentId: string = null,
    attachmentRequired: boolean = false,
    attachmentDeliverDays: number = null,
    contactInfo: string = null,
    tenderId: string = '',
    companyId: string = '',
    userId: string = '',
    products: Product[] = [], // Add products parameter
    Sendedproducts: Product[] = [], // Add products parameter
    OrderNr: number = 0,
    DeliveryMethod: string = '',
    paymentMethod: string = '',
    invoices: Invoice[] = [],
    Tender: Tender = null,
    company: Company = null,
  ): OrdersGetResponse {
    return new OrdersGetResponse(
      id,
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
      products, // Pass products to constructor
      Sendedproducts, // Pass products to constructor
      OrderNr,
      DeliveryMethod,
      paymentMethod,
      invoices,
      Tender,
      company
    );
  }
}
