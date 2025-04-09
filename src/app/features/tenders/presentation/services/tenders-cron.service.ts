import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TendersRepository } from '../../persistence/repositories/tenders.repository';
import { TenderStatusEnum } from '../../domain/constants/enums/tender-status.enum';
import { TenderQuotationsRepository } from '../../persistence/repositories/tender-quotations.repository';
import { TenderQuotation } from '../../domain/entities/tender-quotation';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class TendersCronService {
  private readonly logger = new Logger(TendersCronService.name);

  constructor(
    private readonly tendersRepository: TendersRepository,
    private readonly tenderQuotationsRepository: TenderQuotationsRepository
) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Runs every midnight
  async checkAndCloseExpiredTenders() {
    this.logger.log('Running cron job to check and close expired tenders.');

    // Get today's date (start of the day)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const twoMonthsAgo = new Date(today);
    twoMonthsAgo.setMonth(today.getMonth() - 2);// Normalize to start of the day

    try {
      // Find tenders that are NOT in "Planning" or "Finished" and have expired
      const expiredTenders = await this.tendersRepository.getAll({
        status: { $nin: [TenderStatusEnum.PLANING, TenderStatusEnum.FINISHED] },
        endDate: { $lt: twoMonthsAgo },
      });

      if (expiredTenders.length === 0) {
        this.logger.log('No expired tenders found.');
        return;
      }

      // Update status of expired tenders to "Closed"
      for (const tender of expiredTenders) {
        await this.tendersRepository.updateStatus(
          tender._id,
          TenderStatusEnum.FINISHED,
        );
        this.logger.log(`Tender ID: ${tender._id} has been marked as Closed.`);
        const quotations: TenderQuotation[] = await this.tenderQuotationsRepository.getAll(
            { tenderId: createObjectId(tender._id),
                status: { $in: [TenderStatusEnum.PENDING] }
            },            
        );
        for (const quatation of quotations) {       
          await this.tenderQuotationsRepository.updateStatus(
            quatation._id,
            TenderStatusEnum.CANCELLED,
          );
          this.logger.log(`Quatation ID: ${quatation._id} has been marked as Closed.`);
        }
      }

      this.logger.log(`Updated ${expiredTenders.length} expired tenders.`);
    } catch (error) {
      this.logger.error('Error in closing expired tenders:', error);
    }
  }
}
