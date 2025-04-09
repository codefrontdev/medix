import { Product } from "src/app/features/orders/domain/entities/product";
import { Attachment } from "src/app/@core/shared/domain/entities/attachment";
import { Bank } from "src/app/@core/shared/domain/entities/bank";

export class TransformsGetAllResult {
  public constructor(
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
    public readonly transformRequest: boolean,
    public readonly transformDoc?: Attachment[],
    public readonly withdrawRequest?: boolean,
    public readonly bankAccount?: Bank[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
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
  ): TransformsGetAllResult {
    return new TransformsGetAllResult(
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
