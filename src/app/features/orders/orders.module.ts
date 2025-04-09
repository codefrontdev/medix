
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderFactory } from './applicatoin/factories/order.factory';

import { OrdersRepository } from './persistence/repositories/orders.repository';
import { CreatedOrderSchema, OrderSchema } from './persistence/schemas/order.schema';
import { OrderSchemaFactory } from './persistence/factories/order-schema.factory';

import { OrdersController } from './presentation/controllers/orders.controller';
import { OrdersUpsertHandler } from './applicatoin/commands/orders/upsert/tenders-upsert.handler';
import { OrdersDeleteHandler } from './applicatoin/commands/orders/delete/orders-delete.handler';
import { OrdersGetHandler } from './applicatoin/queries/orders/get/orders-get.handler';
import { OrdersGetAllHandler } from './applicatoin/queries/orders/getAll/orders-get-all.handler';
import { OrdersChangeStatusHandler } from './applicatoin/commands/orders/change-status/orders-change-status.handler';
import { TendersRepository } from '../tenders/persistence/repositories/tenders.repository';
import { TendersModule } from '../tenders/tenders.module';
import { CompaniesModule } from '../companies/companies.module';
import { NotificationModule } from '../notifications/notification.module';
import { UserModule } from '../users/user.module';
import { CompanyService } from '../companies/application/services/getCompanyById';


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: OrderSchema.name,
        schema: CreatedOrderSchema,
      },
    ]),
    TendersModule, // Import TendersModule to access shared resources
    CompaniesModule,
    NotificationModule,
    UserModule   
  ],
  providers: [
    OrdersRepository,
    OrderSchemaFactory,
    OrderFactory,
    OrdersUpsertHandler,
    OrdersChangeStatusHandler,
    OrdersDeleteHandler,
    OrdersGetHandler,
    OrdersGetAllHandler,
    CompanyService    

  ],
  controllers: [OrdersController],
})
export class OrdersModule {}