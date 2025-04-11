import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { CompaniesRepository } from "../../../persistence/repositories/companies.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { CompaniesGetResult } from "../../results/companies-get.result";
import { CompaniesGetMineQuery } from "./companies-get-mine-query";

@QueryHandler(CompaniesGetMineQuery)
export class CompaniesGetMyHandler
  implements ICommandHandler<CompaniesGetMineQuery, AppResult<CompaniesGetResult>> {
  public constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  public async execute(
    query: CompaniesGetMineQuery,
  ): Promise<AppResult<CompaniesGetResult>> {
    const entity = await this.companiesRepository.getCompanyByUserId(query.userId);


    if (entity === null) {
      return AppResult.createError(AppErrors.nullValue('object'));
    }

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
      entity.stampedAuthorizationFormUrl, // Updated to URL
      entity.registrationExpirationDate,
      entity.creationDate,
      entity.placeOfIssue,
      entity.turnover,
      entity.type,
      entity.activities,
      entity.categoriesIds,
      entity.logoMedia, // Updated to URL
      entity.authorizationFileUrl, // New field
      entity.registeringFileUrl, // New field      
      entity.contactInfo,
      entity.userId,
      entity.taxInformation, // New field
      entity.deliveryAddress, // New field
      entity.employeesNumber, // New field
      entity.CompanyNr, // New field
      entity.itemNr, // New field
      entity.orderNr, // New field
      entity.TenderNr, // New field
      entity.OpportunityNr, // New field
      
    );

    return AppResult.createSuccess<CompaniesGetResult>(null, null, resultData);
  }
}
