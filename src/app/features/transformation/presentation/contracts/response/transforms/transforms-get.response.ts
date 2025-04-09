import { Product } from "src/app/features/orders/domain/entities/product";
import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { Bank } from "src/app/@core/shared/domain/entities/bank";

export class TransformsGetResponse {
  private constructor(
    public readonly id: string, // Transform ID
    public readonly title: string, // Transform title
    public readonly status: string, // Transform status
    public readonly buyerId: string, // Buyer ID
    public readonly sellerId: string, // Seller ID
    public readonly userId: string, // User ID
    public readonly orderId: string, // Associated Order ID
    public readonly type: string, // type ID
    public readonly products: Product[], // List of products in the transform
    public readonly totalPrice: number, // Total price of the transform
    public readonly transformRequest: boolean, // Transform request flag
    public readonly transformDoc?: Attachment[], // Optional transform documentation
    public readonly withdrawRequest?: boolean, // Withdraw request flag (optional)
    public readonly bankAccount?: Bank[], // Bank account details (optional)
    public readonly createdAt?: Date, // Creation date (optional)
    public readonly updatedAt?: Date // Last updated date (optional)
  ) {}

  public static create(
    id: string,
    title: string,
    status: string,
    buyerId: string,
    sellerId: string,
    userId: string,
    orderId: string,
    type: string,
    products: Product[],
    totalPrice: number,
    transformRequest: boolean,
    transformDoc?: Attachment[],
    withdrawRequest?: boolean,
    bankAccount?: Bank[],
    createdAt?: Date,
    updatedAt?: Date
  ): TransformsGetResponse {
    return new TransformsGetResponse(
      id,
      title,
      status,
      buyerId,
      sellerId,
      userId,
      orderId,
      type,
      products,
      totalPrice,
      transformRequest,
      transformDoc,
      withdrawRequest,
      bankAccount,
      createdAt,
      updatedAt
    );
  }
}
