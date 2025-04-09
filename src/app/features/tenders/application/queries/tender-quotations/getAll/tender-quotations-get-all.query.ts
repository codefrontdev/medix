import { TenderQuotationStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-quotation-status.enum";

export class TenderQuotationsGetAllQuery {
  public constructor(
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly withPaging: boolean,
    public readonly status: TenderQuotationStatusEnum | null,
    public readonly tenderId: string | string[] | null,
    public readonly userId: string | null,
  ) { }
}