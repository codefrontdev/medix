import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { Bank } from "src/app/@core/shared/domain/entities/bank";
import { Product } from "src/app/features/orders/domain/entities/product";

export class TransformsGetResult {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status: string,
    public readonly buyerId: string,
    public readonly sellerId: string,
    public readonly userId: string,
    public readonly orderId: string,
    public readonly type: string,
    public readonly products: Product[],
    public readonly totalPrice: number,
    public readonly createdAt: Date,
    public readonly transformRequest: boolean = false,
    public readonly transformDoc?: Attachment[],
    public readonly withdrawRequest: boolean = false,
    public readonly bankAccount?: Bank[],
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
    createdAt: Date,
    transformRequest: boolean = false,
    transformDoc?: Attachment[],
    withdrawRequest: boolean = false,
    bankAccount?: Bank[]
  ): TransformsGetResult {
    return new TransformsGetResult(
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
      createdAt,
      transformRequest,
      transformDoc || [],
      withdrawRequest,
      bankAccount || [],
      
    );
  }
}
