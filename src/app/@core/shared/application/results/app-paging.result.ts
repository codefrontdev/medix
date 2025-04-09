export class AppPagingResult {
  private constructor(
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly firstPage: number,
    public readonly lastPage: number,
    public readonly previousPage: number,
    public readonly nextPage: number,
    public readonly totalRecords: number,
    public readonly totalPages: number,
    public readonly firstItem: number,
    public readonly lastItem: number,
    public readonly withPaging: boolean,
  ) { }

  public static create(
    pageSize: number,
    pageNumber: number,
    firstPage: number,
    lastPage: number,
    previousPage: number,
    nextPage: number,
    totalRecords: number,
    totalPages: number,
    firstItem: number,
    lastItem: number,
    withPaging: boolean,
  ): AppPagingResult {
    return new AppPagingResult(
      pageSize,
      pageNumber,
      firstPage,
      lastPage,
      previousPage,
      nextPage,
      totalRecords,
      totalPages,
      firstItem,
      lastItem,
      withPaging,
    );
  }
}