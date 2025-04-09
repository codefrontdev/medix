import { TenderQuotationStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-quotation-status.enum";

export class TenderQuotationsGetAllQueryJ {
  public constructor(
    public readonly tenderId: string | null,
    public readonly userId: string | null,
  ) { }
}