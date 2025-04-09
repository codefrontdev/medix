import { ObjectId } from "mongoose";
import { CompaniesResponse } from "src/app/features/companies/presentation/contracts/response/companies.response";
import { Product } from "src/app/features/tenders/domain/entities/product";


export class TenderQuotationsGetAllResponse {
  private constructor(
    public readonly id: string,
    /*
    public readonly value: number,
    public readonly description: string,
    */
    public readonly products: Product[] = [],
    public readonly paymentMethod: string,
    public readonly DeadLineDate: string,
    public readonly DeliveryMethod: string,
    public readonly contactMethod: string,
    public readonly deliverDays: number,
    public readonly status: string,
    public readonly tenderId: string,
    public readonly companyId: string,
    public readonly company: CompaniesResponse,
    public readonly userId: string,
    public readonly OpportunityNr: number,
  ) { }

  public static create(
    id: string,
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
    status: string,
    tenderId: string,
    companyId: string,
    company: CompaniesResponse,
    userId: string,
    OpportunityNr: number,
  ): TenderQuotationsGetAllResponse {
    return new TenderQuotationsGetAllResponse(
      id,
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
      OpportunityNr
    );
  }
}
