export class CompaniesGetAllAttachmentsResponse {
    private constructor(
      public readonly name: string,
      public readonly url: string,
      public readonly type: string,
      public readonly isProtected: boolean,
      public readonly userId: string,
      public readonly companyId: string,
      public readonly source: string,
      public readonly sourceType: string
    ) { }
  
    public static create(
      name: string,
      url: string,
      type: string,
      isProtected: boolean,
      userId: string,
      companyId: string,
      source: string,
      sourceType: string
    ): CompaniesGetAllAttachmentsResponse {
      return new CompaniesGetAllAttachmentsResponse(
        name,
        url,
        type,
        isProtected,
        userId,
        companyId,
        source,
        sourceType
      );
    }
  }
  