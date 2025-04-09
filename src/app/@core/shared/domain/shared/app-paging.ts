export class AppPaging {
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
  ): AppPaging {
    return new AppPaging(
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

  public static calc(
    withPaging: boolean,
    totalRecords: number,
    pageSize: number,
    pageNumber: number,
  ): AppPaging {
    const skip = (pageNumber - 1) * pageSize;

    const totalPages =
      withPaging && pageSize > 0 ?
        Math.ceil(totalRecords / pageSize)
        :
        0;

    const firstPage =
      totalRecords > 0 ?
        1
        :
        null;

    const lastPage =
      totalRecords > 0 ?
        totalPages
        :
        null;

    const previousPage =
      pageNumber > 1 ?
        pageNumber - 1
        :
        null;

    const nextPage =
      pageNumber < totalPages ?
        pageNumber + 1
        :
        null;

    const firstItem =
      withPaging && totalRecords > 0 ?
        skip + 1
        :
        null;

    const lastItem =
      withPaging && totalRecords > 0 ?
        Math.min(pageNumber * pageSize, totalRecords)
        :
        null;

    return AppPaging.create(
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