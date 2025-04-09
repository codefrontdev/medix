import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { TendersUpdateStatusCommand } from './tenders-update-status-query';
import { TendersRepository } from 'src/app/features/tenders/persistence/repositories/tenders.repository';

@CommandHandler(TendersUpdateStatusCommand)
export class TendersUpdateStatusHandler implements ICommandHandler<TendersUpdateStatusCommand> {
  constructor(private readonly tenderRepository: TendersRepository) {}

  async execute(command: TendersUpdateStatusCommand): Promise<AppResult<null>> {
    const { tenderId, status, userId } = command;

    try {
      // Fetch the tender by ID
      const tender = await this.tenderRepository.getById(tenderId);
      // Update the status and set the updatedBy field
      tender.status = status;

      // Save the updated tender back to the repository
      await this.tenderRepository.updateStatus(tender._id,tender.status);

      return AppResult.createSuccess(null, 'Tender status updated successfully');
    } catch (error) {
      return AppResult.createError(error);
    }
  }
}
