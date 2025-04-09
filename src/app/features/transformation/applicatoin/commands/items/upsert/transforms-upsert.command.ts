import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { Bank } from "src/app/@core/shared/domain/entities/bank";
import { Product } from "src/app/features/orders/domain/entities/product";

export class TransformsUpsertCommand {
  public constructor(
    public readonly id: string | null, // ID can be null for new transforms
    public readonly title: string, // Transform title
    public readonly status: string, // Transform status
    public readonly buyerId: string, // Buyer ID
    public readonly sellerId: string, // Seller ID
    public readonly userId: string, // Seller ID
    public readonly orderId: string, // Associated Order ID
    public readonly type: string, // Associated Order ID
    public readonly products: Product[], // List of products in the transform
    public readonly totalPrice: number, // Total price of the transform
    public readonly transformRequest: boolean, // Indicates if a transform request exists
    public readonly transformDoc?: Attachment[], // Optional transform documentation
    public readonly withdrawRequest: boolean = false, // Indicates if a withdraw request exists
    public readonly bankAccount?: Bank[], // Optional bank account information for withdrawal
  ) {}
}
