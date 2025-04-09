import { TransformStatusEnum } from "src/app/features/transformation/domain/constants/enum/transform-status-enum";

export class TransformsGetAllQuery {
  public constructor(
    public readonly pageSize: number, // Number of items per page
    public readonly pageNumber: number, // Current page number
    public readonly withPaging: boolean, // Whether to include pagination
    public readonly search: string | null, // Search term (optional)
    public readonly status: TransformStatusEnum | null, // Filter by item status (optional)
    public readonly buyerId: string | null, // Filter by company ID (optional)
    public readonly sellerId: string | null, // Filter by company ID (optional)
    public readonly userId: string | null, // Filter by user ID (optional)
    public readonly startDate?: Date | null, // Filter by start date (optional)
    public readonly endDate?: Date | null,
  ) {}
}
