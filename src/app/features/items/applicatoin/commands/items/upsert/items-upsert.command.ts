import { Attachment } from "src/app/@core/shared/domain/entities/attachment";

export class ItemsUpsertCommand {
  public constructor(
    public readonly id: string | null, // ID can be null for new items
    public readonly name: string, // Item name
    public readonly SKUCode: string, // Item name
    public readonly manufacturer: string, // Item name
    public readonly brand: string, // Item name
    public readonly model: string, // Item name
    public readonly unit: string, // Item name
    public readonly categories: string, // Item name
    public readonly description: string, // Item description
    public readonly price: number, // Item price
    public readonly vat: number, // VAT percentage
    public readonly stock: number, // Stock quantity
    public readonly tags: string[], // Tags for categorization
    public readonly image?: string, // Optional image URL
    public readonly attachments?: Attachment[], // Optional attachments
    public readonly status?: string, // Optional status (e.g., Active, Inactive)
    public readonly type?: string, // Item type (e.g., Machine, Service)
    public readonly companyId: string = '', // Associated company ID
    public readonly userId: string = '', // User performing the action
    public readonly ItemNR: number = 0, // User performing the action
  ) {}
}
