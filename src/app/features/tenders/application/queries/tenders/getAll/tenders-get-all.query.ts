import { TenderStatusEnum } from "../../../../domain/constants/enums/tender-status.enum";
import { TenderTypeEnum } from "../../../../domain/constants/enums/tender-type.enum";

export class TendersGetAllQuery {
  public constructor(
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly withPaging: boolean,
    public readonly search: string | null,
    public readonly type: TenderTypeEnum | null,
    public readonly status: TenderStatusEnum | TenderStatusEnum[] |null,
    public readonly categoriesIds: string[] | null,
    public readonly companyId: string | null,
    public readonly userId: string | null,
  ) { }
}