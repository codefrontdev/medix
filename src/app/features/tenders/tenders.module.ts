import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { TenderFactory } from './application/factories/tender.factory';

import { TendersRepository } from './persistence/repositories/tenders.repository';
import { CreatedTenderSchema, TenderSchema } from './persistence/schemas/tender.schema';
import { TenderSchemaFactory } from './persistence/factories/tender-schema.factory';

import { TendersController } from './presentation/controllers/tenders.controller';
import { TendersUpsertHandler } from './application/commands/tenders/upsert/tenders-upsert.handler';
import { TendersDeleteHandler } from './application/commands/tenders/delete/tenders-delete.handler';
import { TenderQuotationsController } from './presentation/controllers/tender-quotations.controller';
import { CreatedTenderQuotationSchema, TenderQuotationSchema } from './persistence/schemas/tender-quotation.schema';
import { TendersGetHandler } from './application/queries/tenders/get/tenders-get.handler';
import { TendersGetAllHandler } from './application/queries/tenders/getAll/tenders-get-all.handler';
import { TenderQuotationsDeleteHandler } from './application/commands/tender-quotations/delete/tender-quotations-delete.handler';
import { TenderQuotationsUpsertHandler } from './application/commands/tender-quotations/upsert/tender-quotations-upsert.handler';
import { TenderQuotationFactory } from './application/factories/tender-quotation.factory';
import { TenderQuotationsGetHandler } from './application/queries/tender-quotations/get/tender-quotations-get.handler';
import { TenderQuotationsGetAllHandler } from './application/queries/tender-quotations/getAll/tender-quotations-get-all.handler';
import { TenderQuotationSchemaFactory } from './persistence/factories/tender-quotation-schema.factory';
import { TenderQuotationsRepository } from './persistence/repositories/tender-quotations.repository';
import { TendersChangeStatusHandler } from './application/commands/tenders/change-status/tenders-change-status.handler';
import { TendersUpdateStatusHandler } from './application/queries/tender-quotations/update/tender-update-status.handler';
import { TenderQuotationsUpdateStatusHandler } from './application/queries/tender-quotations/update/tender-quotations-update-status.handler';
import { CompanyService } from '../companies/application/services/getCompanyById';
import { CompaniesModule } from '../companies/companies.module';
import { TendersCronService } from './presentation/services/tenders-cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TenderQuotationsGetAllHandlerj2 } from './application/queries/tender-quotations/getAll/tender-quotations-get-allj2.handler';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CqrsModule,
    MongooseModule.forFeature(
      [
        {
          name: TenderSchema.name,
          schema: CreatedTenderSchema,
        },
        {
          name: TenderQuotationSchema.name,
          schema: CreatedTenderQuotationSchema,
        },
      ],
    ),
    CompaniesModule
  ],
  providers: [
    TendersRepository,
    TenderSchemaFactory,
    TenderFactory,
    TendersUpsertHandler,
    TendersChangeStatusHandler,
    TendersDeleteHandler,
    TendersGetHandler,
    TendersGetAllHandler,
    TenderQuotationsRepository,
    TenderQuotationSchemaFactory,
    TenderQuotationFactory,
    TenderQuotationsUpsertHandler,
    TenderQuotationsDeleteHandler,
    TenderQuotationsGetHandler,
    TenderQuotationsGetAllHandler,
    TenderQuotationsUpdateStatusHandler,
    TendersUpdateStatusHandler,
    CompanyService,
    TendersCronService,
    TenderQuotationsGetAllHandlerj2
  ],
  controllers: [
    TendersController,
    TenderQuotationsController,
  ],
  exports: [
    TendersRepository, 
    TenderQuotationsRepository,
    MongooseModule,
  ],
})
export class TendersModule { }
