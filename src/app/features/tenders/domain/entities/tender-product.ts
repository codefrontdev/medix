import { ObjectId } from "mongoose";

export class Product {
    constructor(
      public readonly item?: string,
      public readonly quantity?: number,
      public readonly unit?: string,
      public readonly attachment?: File | null, // Or any other type as per your requirement
      public readonly notice?: string, // Optional image field     
    ) {}
  }
