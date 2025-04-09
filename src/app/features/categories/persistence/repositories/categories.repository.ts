import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { Category } from "../../domain/entities/category";
import { CategorySchema } from "../schemas/category.schema";
import { CategorySchemaFactory } from "../factories/category-schema.factory";

@Injectable()
export class CategoriesRepository
  extends BaseRepository<CategorySchema, Category> {
  public constructor(
    @InjectModel(CategorySchema.name)
    public readonly model: Model<CategorySchema>,
    public readonly schemaFactory: CategorySchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }
}