import { ObjectId } from "mongoose";

export class Product {
    constructor(
      public readonly productId: string, // Reference to ItemSchema
    public readonly unitName: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly attachment?: File | null, // Or any other type as per your requirement
    public readonly image?: string, // Optional image field
    public readonly notice?: string,
    public readonly SKUCode?: string,
    public readonly vat?: string,
    ) {}
  }
