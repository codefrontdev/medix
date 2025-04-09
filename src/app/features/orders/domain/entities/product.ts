export class Product {
    quatationId: string;
    constructor(
      public readonly itemId: string,
      public readonly item: string,
      public readonly quantity: number,
      public readonly price: number,
      public readonly discount: number,
      public readonly notice?: string,
      public readonly image?: string,
      public readonly attachment?: File | null, // or any other type as per your requirement
      public readonly SKUCode?: string,
      public readonly vat?: string,
      public readonly companyId?: string,
      public readonly tender?: string,
    ) {}
  }