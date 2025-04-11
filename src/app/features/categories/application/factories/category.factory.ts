/** @format */

import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/app/@core/shared/persistence/factories/entity.factory";
import { ObjectId } from "mongodb";
import { Category } from "../../domain/entities/category";
import { CategoriesRepository } from "../../persistence/repositories/categories.repository";
import {
  createObjectId,
  createObjectIdAsString,
} from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class CategoryFactory implements EntityFactory<Category> {
  public constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public async save(
    id: string | null,
    name: string,
    TagName: string,
    parentId: string | null,
    displayOrder: number
  ): Promise<Category | null> {
    const isInsert = id === null || id === undefined || id === "null";

    if (isInsert) {
      const entity = new Category(
        createObjectIdAsString(id),
        name,
        TagName,
        parentId,
        null,
        displayOrder,
        true,
        null,
        null,
        null,
        null,
        null,
        null
      );

      console.log("entity", entity);
      await this.categoriesRepository.insert(entity);

      return entity;
    }

    const foundEntity = await this.categoriesRepository.getById(id);

    if (foundEntity == null) {
      return null;
    }

    foundEntity.name = name;
    foundEntity.TagName = TagName;
    foundEntity.parentId = parentId;
    foundEntity.displayOrder = displayOrder;

    const updatedEntity = await this.categoriesRepository.getAndUpdate(
      {
        _id: createObjectId(id),
      },
      foundEntity
    );

    return updatedEntity;
  }
}
