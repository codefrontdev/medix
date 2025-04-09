import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { ItemSchema } from "../schemas/item.schema"; // Import the ItemSchema
import { Item } from "../../domain/entities/item"; // Import the Item entity
import { ItemSchemaFactory } from "../factories/item-schema.factory"; // Import the schema factory

@Injectable()
export class ItemsRepository extends BaseRepository<ItemSchema, Item> {
  public constructor(
    @InjectModel(ItemSchema.name) // Inject the Mongoose model
    public readonly model: Model<ItemSchema>,
    public readonly schemaFactory: ItemSchemaFactory,
  ) {
    super(model, schemaFactory); // Pass to BaseRepository constructor
  }
}
