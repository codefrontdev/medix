import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TendersChangeStatusCommand } from "./tenders-change-status.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TendersRepository } from "src/app/features/tenders/persistence/repositories/tenders.repository";
import { TenderFactory } from "../../../factories/tender.factory";
import { TendersGetResult } from "../../../results/tenders/tenders-get.result";
import { TenderQuotationsRepository } from "src/app/features/tenders/persistence/repositories/tender-quotations.repository";
import { TenderQuotationFactory } from "../../../factories/tender-quotation.factory";
import { TenderStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-status.enum";
import { TenderQuotationStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-quotation-status.enum";
import { TendersError } from "src/app/features/tenders/domain/errors/tenders-error";

@CommandHandler(TendersChangeStatusCommand)
export class TendersChangeStatusHandler
  implements ICommandHandler<TendersChangeStatusCommand, AppResult<TendersGetResult>> {
  public constructor(
    private readonly tendersRepository: TendersRepository,
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
    private readonly tenderFactory: TenderFactory,
    private readonly tenderQuotationFactory: TenderQuotationFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  public async execute(
    command: TendersChangeStatusCommand,
  ): Promise<AppResult<TendersGetResult>> {
    var foundTenderEntity =
      await this
        .tendersRepository
        .getById(
          command.id,
        );

    if (foundTenderEntity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'tender',
            ),
        );
    }

    if (command.userId != foundTenderEntity.userId) {
      return AppResult
        .createError(
          AppErrors.notRelateToYourAccount(),
        );
    }

    if (command.status == TenderStatusEnum.ACCEPTED && command.tenderQuotationId == null) {
      return AppResult
        .createError(
          TendersError.acceptQuotationMustHasQuotationId(),
        );
    }

    var foundTenderQuotationEntity =
      await this
        .tenderQuotationsRepository
        .getById(
          command.tenderQuotationId,
        );
    if (command.status != TenderStatusEnum.OPENED && command.tenderQuotationId == null) {
     
    if (foundTenderQuotationEntity === null) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'tenderQuotation',
            ),
        );
    } 
    }

    if (command.status == TenderStatusEnum.ACCEPTED) {
      let tenderQuotationEntity =
        await this
          .tenderQuotationFactory
          .save(
            foundTenderQuotationEntity._id,
            /*
            foundTenderQuotationEntity.value,
            foundTenderQuotationEntity.description,
            */
            foundTenderQuotationEntity.products,
            foundTenderQuotationEntity.paymentMethod,
            foundTenderQuotationEntity.DeadLineDate,
            foundTenderQuotationEntity.DeliveryMethod,
            foundTenderQuotationEntity.contactMethod,
            foundTenderQuotationEntity.deliverDays,
            TenderQuotationStatusEnum.ACCEPTED,
            foundTenderQuotationEntity.tenderId,
            foundTenderQuotationEntity.companyId,
            foundTenderQuotationEntity.userId,
            foundTenderQuotationEntity.OpportunityNr,
          );

      tenderQuotationEntity = this
        .eventPublisher
        .mergeObjectContext(
          tenderQuotationEntity,
        );

      tenderQuotationEntity
        .commit();
    }



    let tenderEntity =
      await this
        .tenderFactory
        .save(
          foundTenderEntity._id,
          foundTenderEntity.title,
          foundTenderEntity.minValue,
          foundTenderEntity.value,
          foundTenderEntity.endDate,
          foundTenderEntity.deliverDate,
          foundTenderEntity.type,
          command.status,
          foundTenderEntity.categoriesIds,
          foundTenderEntity.region,
          foundTenderEntity.city,
          foundTenderEntity.fileName,
          foundTenderEntity.fileDescription,
          foundTenderEntity.fileId,
          foundTenderEntity.attachmentName,
          foundTenderEntity.attachmentDescription,
          foundTenderEntity.attachmentId,
          foundTenderEntity.attachmentRequired,
          foundTenderEntity.attachmentDeliverDays,
          foundTenderEntity.receiveDocumentsType,
          foundTenderEntity.Paylater,
          foundTenderEntity.contactInfo,
          foundTenderEntity.companyId,
          foundTenderEntity.userId,
        );

    tenderEntity = this
      .eventPublisher
      .mergeObjectContext(
        tenderEntity,
      );

    tenderEntity
      .commit();

    const resultData =
      TendersGetResult
        .create(
          tenderEntity._id,
          tenderEntity.title,
          tenderEntity.minValue,
          tenderEntity.value,
          tenderEntity.endDate,
          tenderEntity.deliverDate,
          tenderEntity.type,
          tenderEntity.status,
          tenderEntity.categoriesIds,
          [],
          tenderEntity.region,
          tenderEntity.city,
          tenderEntity.fileName,
          tenderEntity.fileDescription,
          tenderEntity.fileId,
          tenderEntity.attachmentName,
          tenderEntity.attachmentDescription,
          tenderEntity.attachmentId,
          tenderEntity.attachmentRequired,
          tenderEntity.attachmentDeliverDays,
          tenderEntity.receiveDocumentsType,
          tenderEntity.Paylater,
          tenderEntity.contactInfo,
          tenderEntity.companyId,
          tenderEntity.userId,
        );

    return AppResult
      .createSuccess<TendersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
