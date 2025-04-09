import { ItemStatusEnum } from "../../../../domain/constants/enum/item-status-enum";

export class ItemsGetAllQuery {
  public constructor(
    public readonly status: ItemStatusEnum | null, // Filter items by status (optional)
    public readonly userId: string | null, // Filter items by user ID (optional)
  ) {}
}
