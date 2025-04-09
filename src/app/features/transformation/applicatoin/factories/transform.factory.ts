import { Injectable } from '@nestjs/common';
import { Transform } from '../../domain/entities/transform'; // Import Transform entity
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { Bank } from 'src/app/@core/shared/domain/entities/bank';
import { isEmpty } from 'class-validator';
import { Product } from 'src/app/features/orders/domain/entities/product';
import { TransformsRepository } from '../../persistence/repositories/stransforms.repository';

@Injectable()
export class TransformFactory implements EntityFactory<Transform> {
  public constructor(
    private readonly transformsRepository: TransformsRepository,
  ) {}

  public async save(
    id: string | null,
    title: string,
    status: string,
    buyerId: string,
    sellerId: string,
    userId: string,
    orderId: string,
    type:string,
    products: Product[],
    totalPrice: number,
    transformRequest: boolean,
    transformDoc: Attachment[],
    withdrawRequest: boolean,
    bankAccount: Bank[],
    createdAt?: Date,
    updatedAt?: Date,
  ): Promise<Transform> {
    const isInsert = id === null;

    // Process attachments to ensure fileId is a string
    const processedAttachments = transformDoc?.map((attachment) =>
      new Attachment(
        attachment.name,
        attachment.description,
        attachment.fileId || null,
        attachment.filepath || null
      )
    ) || [];

    // Process bank accounts
    const processedBankAccounts = bankAccount?.map((account) =>
      new Bank(
        account.accountName,
        account.accountNumber,
        account.bankName,
        account.iban
      )
    ) || [];

    if (isInsert) {
      const entity = Transform.create(
        createObjectIdAsString(id), // Generate a unique ID
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
        processedAttachments, // Use processed attachments
        withdrawRequest,
        processedBankAccounts, // Use processed bank accounts
        createdAt || new Date(), // Default to the current date
        updatedAt || new Date() // Default to the current date
      );

      await this.transformsRepository.insert(entity); // Insert new entity into the repository

      return entity;
    }

    const foundEntity = await this.transformsRepository.getById(id);

    if (foundEntity === null) {
      return null;
    }

    // Update the fields of the existing entity
    foundEntity.title = title;
    foundEntity.status = status;
    foundEntity.buyerId = buyerId;
    foundEntity.sellerId = sellerId;
    foundEntity.userId = userId;
    foundEntity.orderId = orderId;
    foundEntity.type = type,
    foundEntity.products = products;
    foundEntity.totalPrice = totalPrice;
    foundEntity.transformRequest = transformRequest;
    foundEntity.transformDoc = processedAttachments; // Assign processed attachments
    foundEntity.withdrawRequest = withdrawRequest;
    foundEntity.bankAccount = processedBankAccounts; // Assign processed bank accounts
    foundEntity.updatedAt = new Date(); // Update timestamp

    const updatedEntity = await this.transformsRepository.getAndUpdate(
      { _id: createObjectId(id) }, // Find by ObjectId
      foundEntity // Updated entity
    );

    return updatedEntity;
  }
}
