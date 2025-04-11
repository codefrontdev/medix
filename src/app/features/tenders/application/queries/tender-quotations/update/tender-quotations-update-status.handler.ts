import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { TenderQuotationsUpdateStatusCommand } from './tenders-quatation-update-status-query';
import { TenderQuotationsRepository } from 'src/app/features/tenders/persistence/repositories/tender-quotations.repository';

@CommandHandler(TenderQuotationsUpdateStatusCommand)
export class TenderQuotationsUpdateStatusHandler
  implements ICommandHandler<TenderQuotationsUpdateStatusCommand> {
  constructor(
    private readonly tenderQuotationsRepository: TenderQuotationsRepository,
  ) {}

  async execute(
    command: TenderQuotationsUpdateStatusCommand,
  ): Promise<AppResult<null>> {
    const { quotationId, status, userId } = command;

    try {
      // Fetch the tender quotation by ID
      const tenderQuotation = await this.tenderQuotationsRepository.getById(
        quotationId,
      );

      // Update the status of the tender quotation
      tenderQuotation.status = status;
      await this.tenderQuotationsRepository.updateStatus(
        tenderQuotation._id,tenderQuotation.status
      );

      return AppResult.createSuccess(null, 'Tender quotation status updated successfully');
    } catch (error) {
      throw AppResult.createError(error);
    }
  }
}
