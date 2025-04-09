import { Product } from "src/app/features/tenders/domain/entities/product";


export class TenderQuotationsUpsertCommand {
  public constructor(
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
  ) { }
}
