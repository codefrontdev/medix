import { TenderStatusEnum } from "../../../../domain/constants/enums/tender-status.enum";
import { TenderTypeEnum } from "../../../../domain/constants/enums/tender-type.enum";

export class TendersGetAllQueryj {
  public constructor(
    public readonly status: TenderStatusEnum | null,
    public readonly userId: string | null,
  ) { }
}