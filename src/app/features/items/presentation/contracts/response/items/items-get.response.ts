import { Attachment } from "src/app/@core/shared/domain/entities/attachment";

export class ItemsGetResponse {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly SKUCode: string,
    public readonly manufacturer: string,
    public readonly brand: string,
    public readonly model: string,
    public readonly unit: string,
    public readonly categories: string,
    public readonly description: string,
    public readonly price: number,
    public readonly vat?: number,
    public readonly stock?: number,
    public readonly tags?: string[],
    public readonly image?: string,
    public readonly type?: string ,
    public readonly status?: string,
    public readonly companyId: string = '',
    public readonly userId: string = '',
    public readonly ItemNR: number = 0,
    public readonly attachments?: Attachment[],
  ) {}

  public static create(
    id: string,
    name: string,
    SKUCode: string,
    manufacturer: string,
    brand: string,
    model: string,
    unit: string,
    categories: string,
    description: string,
    price: number,
    vat: number = null,
    stock: number = null,
    tags: string[] = [],
    image: string = null,
    type: string,
    status: string = null,
    companyId: string = '',
    userId: string = '',
    ItemNR: number = 0,
    attachments: Attachment[] = []
  ): ItemsGetResponse {
    return new ItemsGetResponse(
      id,
      name,
      SKUCode,
      manufacturer,
      brand,
      model,
      unit,
      categories,
      description,
      price,
      vat,
      stock,
      tags,
      image,
      type,
      status,
      companyId,
      userId,
      ItemNR,
      attachments
    );
  }
}
