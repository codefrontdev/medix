import { Product } from "../../../domain/entities/product";



export class TenderQuotationsGetResult {
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
    public readonly userId: string,
    public readonly OpportunityNr: number,
  ) {
  }

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
    userId: string,
    OpportunityNr: number,
  ): TenderQuotationsGetResult {
    return new TenderQuotationsGetResult(
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
      userId,
      OpportunityNr
    );
  }
}
