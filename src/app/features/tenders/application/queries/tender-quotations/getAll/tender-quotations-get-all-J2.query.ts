import { TenderStatusEnum } from "src/app/features/tenders/domain/constants/enums/tender-status.enum";

export class TenderQuotationsGetAllQueryj2 {
  public constructor(
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly withPaging: boolean,
    public readonly status: TenderStatusEnum | null,
    public readonly tenderId: string | string[] | null,
    public readonly userId: string | null,
    public readonly companyId: string | null,
  ) { }
}