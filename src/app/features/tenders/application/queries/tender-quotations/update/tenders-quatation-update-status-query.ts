import { ICommand } from '@nestjs/cqrs';
import { TenderStatusEnum } from 'src/app/features/tenders/domain/constants/enums/tender-status.enum';

export class TenderQuotationsUpdateStatusCommand implements ICommand {
  constructor(
    public readonly quotationId: string,
    public readonly status: TenderStatusEnum,
    public readonly userId: string,
  ) {}
}
