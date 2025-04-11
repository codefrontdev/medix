/** @format */

import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import {
  CategorySchema,
  CreatedCategorySchema,
} from "./persistence/schemas/category.schema";
import { CategoriesRepository } from "./persistence/repositories/categories.repository";
import { CategorySchemaFactory } from "./persistence/factories/category-schema.factory";
import { CategoryFactory } from "./application/factories/category.factory";
import { CategoriesUpsertHandler } from "./application/commands/upsert/categories-upsert.handler";
import { CategoriesController } from "./presentation/controllers/categories.controller";
import { CategoriesDeleteHandler } from "./application/commands/delete/categories-delete.handler";
import { CategoriesGetHandler } from "./application/queries/get/categories-get.handler";
import { CategoriesGetAllHandler } from "./application/queries/getAll/categories-get-all.handler";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CategorySchema.name,
        schema: CreatedCategorySchema,
      },
    ]),
  ],
  providers: [
    CategoriesRepository,
    CategorySchemaFactory,
    CategoryFactory,
    CategoriesUpsertHandler,
    CategoriesDeleteHandler,
    CategoriesGetHandler,
    CategoriesGetAllHandler,
  ],
  controllers: [CategoriesController],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
