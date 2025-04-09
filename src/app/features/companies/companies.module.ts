import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CompaniesDeleteHandler } from './application/commands/delete/companies-delete.handler';
import { CompaniesUpsertHandler } from './application/commands/upsert/companies-upsert.handler';
import { CompanyFactory } from './application/factories/company.factory';
import { CompaniesGetHandler } from './application/queries/get/companies-get.handler';
import { CompaniesGetAllHandler } from './application/queries/getAll/companies-get-all.handler';
import { CompanySchemaFactory } from './persistence/factories/company-schema.factory';
import { CompaniesRepository } from './persistence/repositories/companies.repository';
import { CompanySchema } from './persistence/schemas/company.schema';
import { CompaniesController } from './presentation/controllers/companies.controller';
import { CompaniesGetMyHandler } from './application/queries/get/companies-getMy.handler';
import { UserCompaniesSchema } from './persistence/schemas/user-company.schema';
import { UserCompaniesRepository } from './persistence/repositories/user-companies.repository';
import { CompaniesService } from './application/services/companies.service';
import { UserCompaniesService } from './application/services/user-companies.service';

@Module(
  {
    imports: [
      CqrsModule,
      MongooseModule.forFeature(
        [
          {
            name: CompanySchema.name,
            schema:
              SchemaFactory
                .createForClass(
                  CompanySchema,
                ),
          },
          {
            name: UserCompaniesSchema.name,
            schema: SchemaFactory.createForClass(UserCompaniesSchema),
          },
        ],
      ),
    ],
    providers: [
      CompaniesService,
      CompaniesRepository,
      CompanySchemaFactory,
      CompanyFactory,
      CompaniesUpsertHandler,
      CompaniesDeleteHandler,
      CompaniesGetHandler,
      CompaniesGetMyHandler,
      CompaniesGetAllHandler,
      UserCompaniesRepository,
      UserCompaniesService,
    ],
    controllers: [
      CompaniesController,
    ],
    exports: [
      CompaniesService,
      CompaniesRepository,
      CompanySchemaFactory,
      CompanyFactory,
      UserCompaniesRepository,
      UserCompaniesService,

    ],
  },
)
export class CompaniesModule { }
