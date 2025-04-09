import { Injectable } from '@nestjs/common';
import { ItemSchema } from '../schemas/item.schema';
import { Item } from '../../domain/entities/item';
import { SchemaFactory } from 'src/app/@core/shared/persistence/factories/schema.factory';
import { createObjectId, fromObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { Attachment } from 'src/app/@core/shared/domain/entities/attachment';

@Injectable()
export class ItemSchemaFactory implements SchemaFactory<ItemSchema, Item> {
  /**
   * Converts a domain entity (Item) to a database schema (ItemSchema)
   */
  public create(entity: Item): ItemSchema {
    return {
      _id: createObjectId(entity._id),
      name: entity.name,
      SKUCode: entity.SKUCode,
      manufacturer: entity.manufacturer,
      brand: entity.brand,
      model: entity.model,
      unit: entity.unit,
      categories: entity.categories,
      description: entity.description || '', // Default to empty string if undefined
      price: entity.price,
      vat: entity.vat || 0, // Default VAT to 0 if undefined
      stock: entity.stock || 0, // Default stock to 0 if undefined
      tags: entity.tags || [], // Default to an empty array if undefined
      image: entity.image || '', // Default to empty string if undefined
      attachments: entity.attachments?.map((attachment) => ({
        name: attachment.name || '', // Default to empty string if undefined
        description: attachment.description || '', // Default to empty string if undefined
        fileId: attachment.fileId, // Convert ObjectId to string
        filepath: attachment.filepath || ''
      })) || [], // Default to an empty array if attachments are undefined
      status: entity.status,
      type: entity.type,
      companyId: createObjectId(entity.companyId),
      userId: createObjectId(entity.userId),      
      ItemNR: entity.ItemNR || 0, // Default displayOrder to 0
      displayOrder: entity.displayOrder || 0, // Default displayOrder to 0
      isVisible: entity.isVisible ?? true, // Default isVisible to true
      createdAt: entity.createdAt || new Date(), // Default to current date if undefined
      updatedAt: entity.updatedAt || new Date(), // Default to current date if undefined
      deletedAt: entity.deletedAt || null, // Default to null if undefined
      createdBy: entity.createdBy || '', // Default to empty string if undefined
      updatedBy: entity.updatedBy || '', // Default to empty string if undefined
      deletedBy: entity.deletedBy || '', // Default to empty string if undefined
    };
  }

  /**
   * Converts a database schema (ItemSchema) to a domain entity (Item)
   */
  public createFromSchema(entitySchema: ItemSchema): Item {
    return new Item(
      fromObjectId(entitySchema._id),
      entitySchema.name,
      entitySchema.SKUCode,
      entitySchema.manufacturer,
      entitySchema.brand,
      entitySchema.model,
      entitySchema.unit,
      entitySchema.categories,
      entitySchema.description || '',
      entitySchema.price,
      entitySchema.vat || 0,
      entitySchema.stock || 0,
      entitySchema.tags || [],
      entitySchema.image || '',
      entitySchema.attachments?.map((attachment) => new Attachment(
        attachment.name || '', // Default to empty string if undefined
        attachment.description || '', // Default to empty string if undefined
        attachment.fileId, // Convert ObjectId to string
        attachment.filepath || ''
      )) || [], // Default to an empty array if attachments are undefined
      entitySchema.status,
      entitySchema.type,
      fromObjectId(entitySchema.companyId).toString(), // Convert ObjectId to string
      fromObjectId(entitySchema.userId).toString(), // Convert ObjectId to string
      entitySchema.ItemNR || 0, // Default displayOrder to 0
      entitySchema.displayOrder || 0, // Default displayOrder to 0
      entitySchema.isVisible ?? true, // Default isVisible to true
      entitySchema.createdAt || new Date(), // Default to current date if undefined
      entitySchema.updatedAt || new Date(), // Default to current date if undefined
      entitySchema.deletedAt || null, // Default to null if undefined
      entitySchema.createdBy || '', // Default to empty string if undefined
      entitySchema.updatedBy || '', // Default to empty string if undefined
      entitySchema.deletedBy || '', // Default to empty string if undefined
    );
  }
}
