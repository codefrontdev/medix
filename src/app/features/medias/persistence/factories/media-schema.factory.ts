import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { SchemaFactory } from "src/app/@core/shared/persistence/factories/schema.factory";
import { MediaSchema } from "../schemas/media.schema";
import { Media } from "../../domain/entities/media";
import { createObjectId, fromObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class MediaSchemaFactory implements SchemaFactory<MediaSchema, Media> {
  public create(entity: Media): MediaSchema {
    return {
      _id: createObjectId(entity._id),
      url: entity.url,
      uniqueName: entity.uniqueName,
      name: entity.name,
      size: entity.size,
      type: entity.type,
      companyId: createObjectId(entity.companyId),
      userId: createObjectId(entity.userId),
      sourceType: entity.sourceType,
      source: createObjectId(entity.source), // Ensure this is of type ObjectId
      isProtected: entity.isProtected,
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

  public createFromSchema(entitySchema: MediaSchema): Media {
    return new Media(
      fromObjectId(entitySchema._id).toString(), // Convert ObjectId to string
      entitySchema.url,
      entitySchema.uniqueName,
      entitySchema.name,
      entitySchema.size,
      entitySchema.type,
      fromObjectId(entitySchema.companyId).toString(), // Convert ObjectId to string
      fromObjectId(entitySchema.userId).toString(), // Convert ObjectId to string
      entitySchema.sourceType,
      fromObjectId(entitySchema.source).toString(), // Convert ObjectId to string
      entitySchema.isProtected,
      entitySchema.displayOrder,
      entitySchema.isVisible,
      entitySchema.createdAt,
      entitySchema.updatedAt,
      entitySchema.deletedAt,
      entitySchema.createdBy,
      entitySchema.updatedBy,
      entitySchema.deletedBy,
    );
  }
}
