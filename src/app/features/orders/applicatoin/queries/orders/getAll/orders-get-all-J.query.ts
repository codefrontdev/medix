import { OrderStatusEnum } from "../../../../domain/constants/enum/order-status-enum";

export class OrdersGetAllQueryj {
  public constructor(
    public readonly status: OrderStatusEnum | null,
    public readonly userId: string | null,
  ) { }
}