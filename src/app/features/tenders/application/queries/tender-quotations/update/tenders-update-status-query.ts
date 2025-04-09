import { ICommand } from '@nestjs/cqrs';
import { TenderStatusEnum } from 'src/app/features/tenders/domain/constants/enums/tender-status.enum';

export class TendersUpdateStatusCommand implements ICommand {
  constructor(
    public readonly tenderId: string,
    public readonly status: TenderStatusEnum,
    public readonly userId: string,
  ) {}
}
