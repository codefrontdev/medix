/** @format */

import { Company } from "src/app/features/companies/domain/entities/company";
import { Product } from "../../../domain/entities/product";
import { Tender } from "src/app/features/tenders/domain/entities/tender";
import { Invoice } from "../../../domain/entities/invoice";
import { TendersGetResult } from "src/app/features/tenders/application/results/tenders/tenders-get.result";

export class OrdersGetResult {
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
    public readonly tenderId: string = "",
    public readonly companyId: string = "",
    public readonly userId: string = "",
    public readonly products: Product[] = [],
    public readonly Sendedproducts: Product[] = [],
    public readonly OrderNr: number = 0,
    public readonly DeliveryMethod: string = "",
    public readonly paymentMethod: string = "",
    public readonly invoices: Invoice[] = [],
    public readonly Tender: TendersGetResult = null,
    public readonly company: Company = null,
    public readonly Buycompany: Company = null
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
    tenderId: string = "",
    companyId: string = "",
    userId: string = "",
    products: Product[] = [],
    Sendedproducts: Product[] = [],
    OrderNr: number = 0,
    DeliveryMethod: string = "",
    paymentMethod: string = "",
    invoices: Invoice[] = [],
    Tender: TendersGetResult = null,
    company: Company = null,
    Buycompany: Company = null
  ): OrdersGetResult {
    return new OrdersGetResult(
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
      products,
      Sendedproducts,
      OrderNr,
      DeliveryMethod,
      paymentMethod,
      invoices,
      Tender,
      company,
      Buycompany
    );
  }
}
