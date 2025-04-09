import { Injectable } from '@nestjs/common';

import { Transform } from '../../domain/entities/transform';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, fromObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { Bank } from 'src/app/@core/shared/domain/entities/bank';
import { Product } from 'src/app/features/orders/domain/entities/product';
import { TransformSchema } from '../schemas/stransform.schema';

@Injectable()
export class TransformSchemaFactory implements SchemaFactory<TransformSchema, Transform> {
  constructor() {
    console.log('TransformSchemaFactory is initialized');
  }
  public create(entity: Transform): TransformSchema {
    return {
      _id: createObjectId(entity._id),
      title: entity.title,
      status: entity.status,
      buyerId: createObjectId(entity.buyerId),
      sellerId: createObjectId(entity.sellerId),
      userId: createObjectId(entity.userId),
      orderId: createObjectId(entity.orderId),
      type: entity.type,
      products: entity.products?.map((product: Product) => ({
        itemId: product.itemId,
        item: product.item,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount || 0,
        notice: product.notice || '',
        image: product.image || '',
        attachment: product.attachment || null,
        SKUCode: product.SKUCode || '',
        vat: product.vat || '0',
        quatationId: product.quatationId || null,
      })) || [],
      totalPrice: entity.totalPrice || 0,
      transformRequest: Boolean(entity.transformRequest),
      transformDoc: entity.transformDoc?.map((doc) => ({
        name: doc.name,
        description: doc.description,
        fileId: doc.fileId || null,
        filepath: doc.filepath,
      })) || [],
      withdrawRequest: Boolean(entity.withdrawRequest),
      bankAccount: entity.bankAccount?.map((bank) => ({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
        iban: bank.iban,
      })) || [],
      createdAt: entity.createdAt || new Date(),
      updatedAt: entity.updatedAt || new Date(),
      displayOrder: entity.displayOrder || 0,
      isVisible: Boolean(entity.isVisible),
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      deletedBy: entity.deletedBy,
    };
  }

  /**
   * Converts a database schema (TransformSchema) to a domain entity (Transform)
   */
  public createFromSchema(schema: TransformSchema): Transform {
    return new Transform(
      fromObjectId(schema._id),
      schema.title,
      schema.status,
      fromObjectId(schema.buyerId),
      fromObjectId(schema.sellerId),
      fromObjectId(schema.userId),
      fromObjectId(schema.orderId),
      schema.type,
      schema.products?.map((product: Product) => ({
        itemId: product.itemId,
        item: product.item,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount || 0,
        notice: product.notice || '',
        image: product.image || '',
        attachment: product.attachment || null,
        SKUCode: product.SKUCode || '',
        vat: product.vat || '0',
        quatationId: product.quatationId
      })) || [],
      Number(schema.totalPrice) || 0,
      Boolean(schema.transformRequest),
      schema.transformDoc?.map((doc) =>
        new Attachment(doc.name, doc.description, doc.fileId || null, doc.filepath)
      ) || [],
      Boolean(schema.withdrawRequest),
      schema.bankAccount?.map((bank) =>
        new Bank(bank.accountName, bank.accountNumber, bank.bankName, bank.iban)
      ) || [],
      schema.createdAt || new Date(),
      schema.updatedAt || new Date(),
      schema.displayOrder,
      schema.isVisible,
      schema.deletedAt,
      schema.createdBy,
      schema.updatedBy,
      schema.deletedBy,
    );
  }
}
