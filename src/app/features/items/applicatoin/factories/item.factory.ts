import { Injectable } from '@nestjs/common';
import { Item } from '../../domain/entities/item'; // Import Item entity
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { ItemsRepository } from '../../persistence/repositories/items.repository';
import { createObjectId, createObjectIdAsString, fromObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';
import { isEmpty } from 'class-validator';

@Injectable()
export class ItemFactory implements EntityFactory<Item> {
  public constructor(
    private readonly itemsRepository: ItemsRepository,
  ) {}

  public async save(
    id: string | null,
    name: string,
    SKUCode: string,
    manufacturer: string,
    brand: string,
    model: string,
    unit: string,
    categories: string,
    description: string,
    price: number,
    vat: number,
    stock: number,
    tags: string[],
    image: string,
    attachments: Attachment[], // Use Attachment[]
    status: string,
    type: string,
    companyId: string,
    userId: string,
    ItemNR: number,
  ): Promise<Item> {
    const isInsert = id === null;

    // Process attachments to ensure fileId is a string
    let processedAttachments = []
    if(!isEmpty(attachments)){
    processedAttachments = attachments.map((attachment) => 
      new Attachment(
        attachment.name,
        attachment.description,
        attachment.fileId || null,
        attachment.filepath || null
      )
    );
    }
    
    if (isInsert) {
      const entity = Item.create(
        createObjectIdAsString(id), // Generate a unique ID
        name,
        SKUCode,
        manufacturer,
        brand,
        model,
        unit,
        categories,
        description,
        price,
        vat,
        stock,
        tags,
        image,
        processedAttachments, // Use processed attachments
        status,
        type,
        companyId,
        userId,
        ItemNR
      );

      await this.itemsRepository.insert(entity); // Insert new entity into the repository

      return entity;
    }

    const foundEntity = await this.itemsRepository.getById(id);

    if (foundEntity === null) {
      return null;
    }

    // Update the fields of the existing entity
    foundEntity.name = name;
    foundEntity.SKUCode = SKUCode;
    foundEntity.manufacturer = manufacturer;
    foundEntity.brand = brand;
    foundEntity.model = model;
    foundEntity.unit = unit;
    foundEntity.categories = categories;
    foundEntity.description = description;
    foundEntity.price = price;
    foundEntity.vat = vat;
    foundEntity.stock = stock;
    foundEntity.tags = tags;
    foundEntity.image = image;
    foundEntity.attachments = processedAttachments; // Assign processed attachments
    foundEntity.status = status;
    foundEntity.type = type;
    foundEntity.ItemNR = ItemNR;

    const updatedEntity = await this.itemsRepository.getAndUpdate(
      { _id: createObjectId(id) }, // Find by ObjectId
      foundEntity, // Updated entity
    );

    return updatedEntity;
  }
}
