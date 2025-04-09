import { AggregateRoot } from '@nestjs/cqrs';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { TransformStatusEnum } from '../constants/enum/transform-status-enum';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { Product } from 'src/app/features/orders/domain/entities/product';
import { Bank } from 'src/app/@core/shared/domain/entities/bank';

export class Transform extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public title: string,
    public status: string = TransformStatusEnum.PENDING,
    public buyerId: string,
    public sellerId: string,
    public userId: string,
    public orderId: string,
    public type: string,
    public products: Product[] = [],
    public totalPrice: number,
    public transformRequest: boolean = false,
    public transformDoc: Attachment[] = [],
    public withdrawRequest: boolean = false,
    public bankAccount: Bank[] = [],
    public createdAt?: Date,
    public updatedAt?: Date,
    public readonly displayOrder?: number,
    public readonly isVisible?: boolean,
    public readonly deletedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string,
    public readonly deletedBy?: string,
  ) {
    super();
  }

  public static create(
    id: string | null,
    title: string,
    status: string,
    buyerId: string,
    sellerId: string,
    userId: string,
    orderId: string,
    type: string,
    products: Product[],
    totalPrice: number,
    transformRequest: boolean = false,
    transformDoc: Attachment[] = [],
    withdrawRequest: boolean = false,
    bankAccount: Bank[] = [],
    createdAt: Date = null,
    updatedAt: Date = null,
    displayOrder: number = 0,
    isVisible: boolean = true,
    deletedAt: Date = null,
    createdBy: string = null,
    updatedBy: string = null,
    deletedBy: string = null,
  ): Transform {
    return new Transform(
      createObjectIdAsString(id),
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
      updatedAt,
      displayOrder,
      isVisible,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy 
    );
  }
}
