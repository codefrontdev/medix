import { OrderStatusEnum } from "../../../../domain/constants/enum/order-status-enum";
import { OrderTypeEnum } from "../../../../domain/constants/enum/order-type.enum";

export class OrdersGetAllQuery {
  public constructor(
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly withPaging: boolean,
    public readonly search: string | null,
    public readonly type: OrderTypeEnum | null,
    public readonly status: OrderStatusEnum | null,
    public readonly TenderId: string[] | null,
    public readonly companyId: string | null,
    public readonly userId: string | null,
    public readonly statusExclusion?: string,
  ) { }
}