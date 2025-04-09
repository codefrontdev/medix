import { Module, Inject, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';




import { CompaniesModule } from '../companies/companies.module';
import { TransformsUpsertHandler } from './applicatoin/commands/items/upsert/transforms-upsert.handler';
import { TransformsChangeStatusHandler } from './applicatoin/commands/items/change-status/transforms-change-status.handler';
import { TransformsDeleteHandler } from './applicatoin/commands/items/delete/transforms-delete.handler';
import { TransformsGetHandler } from './applicatoin/queries/items/get/transforms-get.handler';
import { NotificationModule } from '../notifications/notification.module';
import { UserModule } from '../users/user.module';
import { OrdersModule } from '../orders/orders.module';
import { TransformsGetAllHandler } from './applicatoin/queries/items/getAll/transforms-get-all.handler';
import { TransformsController } from './presentation/controllers/transform.controller';
import { TransformsRepository } from './persistence/repositories/stransforms.repository';
import { CreatedTransformSchema, TransformSchema } from './persistence/schemas/stransform.schema';
import { TransformFactory } from './applicatoin/factories/transform.factory';
import { TransformSchemaFactory } from './persistence/factories/transform-schema.factory';
import { TransformsGetAllAdminHandler } from './applicatoin/queries/items/getAllAdmin/transforms-get-all-admin.handler';


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TransformSchema.name,
        schema: CreatedTransformSchema,
      },
    ]),
    CompaniesModule,
    OrdersModule,
    NotificationModule,
    UserModule,
  ],
  providers: [
    TransformsRepository,
    TransformSchemaFactory,
    TransformFactory,
    TransformsUpsertHandler,
    TransformsGetAllHandler,
    TransformsChangeStatusHandler,
    TransformsDeleteHandler,
    TransformsGetHandler,
    TransformsGetAllAdminHandler,
  ],
  controllers: [TransformsController],
  exports: [
    TransformsRepository,
    TransformFactory, // Ensure this is exported if used in other modules
  ],
})
export class TransformsModule  {}