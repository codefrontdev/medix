/** @format */

import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { TenderQuotationsGetResult } from "../../../results/tender-quotations/tender-quotations-get.result";
import { TenderQuotationsUpsertCommand } from "./tender-quotations-upsert.command";
import { TenderQuotationsRepository } from "src/app/features/tenders/persistence/repositories/tender-quotations.repository";
import { TenderQuotationFactory } from "../../../factories/tender-quotation.factory";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { CompaniesRepository } from "src/app/features/companies/persistence/repositories/companies.repository";

@CommandHandler(TenderQuotationsUpsertCommand)
export class TenderQuotationsUpsertHandler
  implements
    ICommandHandler<
      TenderQuotationsUpsertCommand,
      AppResult<TenderQuotationsGetResult>
    >
{
  public constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
    private readonly tenderQuotationFactory: TenderQuotationFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly companiesRepository: CompaniesRepository
  ) {}

  public async execute(
    command: TenderQuotationsUpsertCommand
  ): Promise<AppResult<TenderQuotationsGetResult>> {
    const isInsert = command.id === null || command.id === undefined;
    
    if (!isInsert) {
      var foundEntity = await this.tenderQuotationsRepository.getById(
        command.id
      );
      console.log("foundEntity", !isInsert);

      if (foundEntity === null) {
        throw AppResult.createError(AppErrors.nullValue("tenderQuotation"));
      }

      if (command.userId != foundEntity.userId) {
        throw AppResult.createError(AppErrors.notRelateToYourAccount());
      }
    } else {
      await this.companiesRepository.updateOpportunityNr(
        command.companyId,
        command.OpportunityNr
      );
    }

    let entity = await this.tenderQuotationFactory.save(
      command.id,
      /*
          command.value,
          command.description,
          */
      command.products,
      command.paymentMethod,
      command.DeadLineDate,
      command.DeliveryMethod,
      command.contactMethod,
      command.deliverDays,
      command.status,
      command.tenderId,
      command.companyId,
      command.userId,
      command.OpportunityNr
    );

    entity = this.eventPublisher.mergeObjectContext(entity);

    entity.commit();

    const resultData = TenderQuotationsGetResult.create(
      entity._id,
      /*
          entity.value,
          entity.description,
          */
      entity.products,
      entity.paymentMethod,
      entity.DeadLineDate,
      entity.DeliveryMethod,
      entity.contactMethod,
      entity.deliverDays,
      entity.status,
      entity.tenderId,
      entity.companyId,
      entity.userId,
      entity.OpportunityNr
    );

    return AppResult.createSuccess<TenderQuotationsGetResult>(
      null,
      null,
      resultData
    );
  }
}
