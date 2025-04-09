import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsRepository } from './persistence/repositories/items.repository';
import { CreatedItemSchema, ItemSchema } from './persistence/schemas/item.schema';
import { ItemSchemaFactory } from './persistence/factories/item-schema.factory';
import { ItemFactory } from './applicatoin/factories/item.factory';
import { ItemsUpsertHandler } from './applicatoin/commands/items/upsert/items-upsert.handler';
import { ItemsChangeStatusHandler } from './applicatoin/commands/items/change-status/items-change-status.handler';
import { ItemsDeleteHandler } from './applicatoin/commands/items/delete/items-delete.handler';
import { ItemsGetHandler } from './applicatoin/queries/items/get/items-get.handler';
import { ItemsGetAllHandler } from './applicatoin/queries/items/getAll/items-get-all.handler';
import { ItemsController } from './presentation/controllers/items.controller';
import { CompaniesModule } from '../companies/companies.module';


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ItemSchema.name,
        schema: CreatedItemSchema,
      },
    ]),
    CompaniesModule
  ],
  providers: [
    ItemsRepository,
    ItemSchemaFactory,
    ItemFactory,
    ItemsUpsertHandler,
    ItemsChangeStatusHandler,
    ItemsDeleteHandler,
    ItemsGetHandler,
    ItemsGetAllHandler,
  ],
  controllers: [ItemsController],
  exports: [],
})
export class ItemsModule {}
