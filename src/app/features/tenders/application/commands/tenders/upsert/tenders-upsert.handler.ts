import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TendersUpsertCommand } from "./tenders-upsert.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { TendersRepository } from "src/app/features/tenders/persistence/repositories/tenders.repository";
import { TenderFactory } from "../../../factories/tender.factory";
import { TendersGetResult } from "../../../results/tenders/tenders-get.result";
import { CompaniesRepository } from "src/app/features/companies/persistence/repositories/companies.repository";

@CommandHandler(TendersUpsertCommand)
export class TendersUpsertHandler
  implements ICommandHandler<TendersUpsertCommand, AppResult<TendersGetResult>> {
  public constructor(
    private readonly tendersRepository: TendersRepository,
    private readonly tenderFactory: TenderFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly companiesRepository: CompaniesRepository
  ) { }

  public async execute(
    command: TendersUpsertCommand,
  ): Promise<AppResult<TendersGetResult>> {
    const isInsert = command.id === null;
    let TenderNR: number | null = command.TenderNr;
    if (!isInsert) {
      var foundEntity =
        await this
          .tendersRepository
          .getById(
            command.id,
          );

      if (foundEntity === null) {
        return AppResult
          .createError(
            AppErrors
              .nullValue(
                'tender',
              ),
          );
      }

      if (command.userId != foundEntity.userId) {
        return AppResult
          .createError(
            AppErrors.notRelateToYourAccount(),
          );
      }
    }else{
      const lastOrder = await this.tendersRepository.getLatestTender();
      const nexttendenr = lastOrder ? lastOrder.TenderNr >= 1000? lastOrder.TenderNr + 1 :1000 : 1000;
      TenderNR = nexttendenr;
      await this.companiesRepository.updateTenderNr(command.companyId, nexttendenr);
      
    }
    console.log(command.products)
    let entity =
      await this
        .tenderFactory
        .save(
          command.id,
          command.title,
          command.minValue,
          command.value,
          command.endDate,
          command.deliverDate,
          command.type,
          command.status,
          command.categoriesIds,
          command.region,
          command.city,
          command.fileName,
          command.fileDescription,
          command.fileId,
          command.attachmentName,
          command.attachmentDescription,
          command.attachmentId,
          command.attachmentRequired,
          command.attachmentDeliverDays,
          command.receiveDocumentsType,
          command.Paylater,
          command.contactInfo,
          command.companyId,
          command.userId,
          command.products,
          TenderNR,          
        );

    entity = this
      .eventPublisher
      .mergeObjectContext(
        entity,
      );

    entity
      .commit();

    const resultData =
      TendersGetResult
        .create(
          entity._id,
          entity.title,
          entity.minValue,
          entity.value,
          entity.endDate,
          entity.deliverDate,
          entity.type,
          entity.status,
          entity.categoriesIds,
          [],
          entity.region,
          entity.city,
          entity.fileName,
          entity.fileDescription,
          entity.fileId,
          entity.attachmentName,
          entity.attachmentDescription,
          entity.attachmentId,
          entity.attachmentRequired,
          entity.attachmentDeliverDays,
          entity.receiveDocumentsType,
          entity.Paylater,
          entity.contactInfo,
          entity.companyId,
          entity.userId,
          entity.products || [],
          entity.TenderNr
        );

    return AppResult
      .createSuccess<TendersGetResult>(
        null,
        null,
        resultData,
      );
  }
}
