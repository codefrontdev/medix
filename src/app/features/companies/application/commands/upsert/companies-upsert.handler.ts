import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CompaniesUpsertCommand } from "./companies-upsert.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { CompaniesRepository } from "../../../persistence/repositories/companies.repository";
import { CompanyFactory } from "../../factories/company.factory";
import { CompaniesError } from "../../../domain/errors/companies-error";
import { CompaniesGetResult } from "../../results/companies-get.result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { S3UploadService } from "src/app/@core/shared/application/services/s3-upload.service";


@CommandHandler(CompaniesUpsertCommand)
export class CompaniesUpsertHandler
  implements ICommandHandler<CompaniesUpsertCommand, AppResult<CompaniesGetResult>> {
  public constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly companyFactory: CompanyFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(
    command: CompaniesUpsertCommand,
  ): Promise<AppResult<CompaniesGetResult>> {
    const isInsert = command.id === null || command.id === undefined || command.id === 'null';
    if (isInsert) {
      const foundEntity = await this.companiesRepository.getByRegistrationNumber(
        command.registrationNumber,
      );
      if (foundEntity !== null) {
        return AppResult.createError(CompaniesError.duplicateRegistrationNumber);
      }
    }

    if (!isInsert) {
      const foundEntity = await this.companiesRepository.getById(command.id);

      if (foundEntity === null) {
        return AppResult.createError(AppErrors.nullValue('company'));
      }

      if (command.userId !== foundEntity.userId) {
        return AppResult.createError(AppErrors.notRelateToYourAccount());
      }
    }
    const generateUniqueCompanyNr = async (): Promise<string> => {
      let companyNr: string;
      let isUnique = false;

      do {
        companyNr = Math.floor(100000 + Math.random() * 900000).toString();
        const existingCompany = await this.companiesRepository.getByCompanyNr(companyNr);
        isUnique = !existingCompany;
      } while (!isUnique);

      return companyNr;
    };
    const companyNr = command.CompanyNr && command.CompanyNr.toString() !== 'null' ? command.CompanyNr.toString() : await generateUniqueCompanyNr();

    let entity = await this.companyFactory.save(
      command.id,
      command.nameAr,
      command.nameEn,
      command.website,
      command.address,
      command.region,
      command.city,
      command.registrationNumber,
      command.ownerType,
      command.stampedAuthorizationFormUrl, // Use S3 URL
      command.registrationExpirationDate,
      command.creationDate,
      command.placeOfIssue,
      command.turnover,
      command.type,
      command.activities,
      command.categoriesIds,
      command.logoMedia, // Use S3 URL for logo
      command.authorizationFileUrl, // Assuming signatureMediaId is not uploaded in this command
      command.registeringFileUrl, // Use S3 URL for registering file
      command.contactInfo,
      command.userId,
      command.taxInformation,
      command.deliveryAddress,
      command.employeesNumber,
      companyNr,
      command.itemNr || 0,
      command.orderNr || 0,
      command.TenderNr || 0,
      command.OpportunityNr || 0,
      
    );

    entity = this.eventPublisher.mergeObjectContext(entity);
    entity.commit();

    const resultData = CompaniesGetResult.create(
      entity._id,
      entity.nameAr,
      entity.nameEn,
      entity.website,
      entity.address,
      entity.region,
      entity.city,
      entity.registrationNumber,
      entity.ownerType,
      command.stampedAuthorizationFormUrl,
      entity.registrationExpirationDate,
      entity.creationDate,
      entity.placeOfIssue,
      entity.turnover,
      entity.type,
      entity.activities,
      entity.categoriesIds,
      command.logoMedia, // Use S3 URL for logo
      command.authorizationFileUrl, // Assuming signatureMediaId is not uploaded in this command
      command.registeringFileUrl, // Use S3 URL for registering file
      entity.contactInfo,
      entity.userId,
      entity.taxInformation,
      entity.deliveryAddress,
      entity.employeesNumber,
      companyNr,
      entity.itemNr,
      entity.orderNr,
      entity.TenderNr,
      entity.OpportunityNr,
      
    );

    return AppResult.createSuccess<CompaniesGetResult>(null, null, resultData);
  }
}
