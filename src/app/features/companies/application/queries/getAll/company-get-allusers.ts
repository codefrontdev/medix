export class CompaniesUserGetAllQuery {
    public constructor(
      public readonly pageSize: number,
      public readonly pageNumber: number,
      public readonly withPaging: boolean,
      public readonly search: string | null,
      public readonly ComapnyId: string | null,
    ) { }
  }