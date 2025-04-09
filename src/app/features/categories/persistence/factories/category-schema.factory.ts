import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { SchemaFactory } from "src/app/@core/shared/persistence/factories/schema.factory";
import { CategorySchema } from "../schemas/category.schema";
import { Category } from "../../domain/entities/category";
import { createObjectId, fromObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class CategorySchemaFactory
  implements SchemaFactory<CategorySchema, Category> {
  public create(
    entity: Category,
  ): CategorySchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      name: entity.name,
      TagName: entity.TagName,
      parentId:
        entity.parentId === null ?
          null
          :
          createObjectId(
            entity.parentId,
          ),
      parent: null,
      displayOrder: entity.displayOrder,
      isVisible: entity.isVisible,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      deletedBy: entity.deletedBy,
    };
  }

  public createFromSchema(
    entitySchema: CategorySchema,
  ): Category {
    return new Category(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.name,
      entitySchema.TagName,
      fromObjectId(
        entitySchema.parentId,
      ),
      entitySchema.parent,
      entitySchema.displayOrder,
      entitySchema.isVisible,
      entitySchema.createdAt,
      entitySchema.updatedAt,
      entitySchema.deletedAt,
      entitySchema.createdBy,
      entitySchema.updatedBy,
      entitySchema.deletedBy,
    )
  }
}