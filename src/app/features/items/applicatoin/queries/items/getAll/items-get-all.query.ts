import { ItemStatusEnum } from "../../../../domain/constants/enum/item-status-enum";
import { ItemTypeEnum } from "../../../../domain/constants/enum/item-type.enum";

export class ItemsGetAllQuery {
  public constructor(
    public readonly pageSize: number, // Number of items per page
    public readonly pageNumber: number, // Current page number
    public readonly withPaging: boolean, // Whether to include pagination
    public readonly search: string | null, // Search term (optional)
    public readonly type: ItemTypeEnum | null, // Filter by item type (optional)
    public readonly status: ItemStatusEnum | null, // Filter by item status (optional)
    public readonly companyId: string | null, // Filter by company ID (optional)
    public readonly userId: string | null, // Filter by user ID (optional)
  ) {}
}
