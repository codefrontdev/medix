// ------------------------------- Response -------------------------------

import { appConstants } from "src/app/@core/values/app-constants";

export class AppPagingResponse {
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
  ): AppPagingResponse {
    return new AppPagingResponse(
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

export function getDefaultPagingObj() {
  return {
    pageSize: appConstants.defaultPageSize,
    pageNumber: 1,
    firstPage: -1,
    lastPage: -1,
    previousPage: -1,
    nextPage: -1,
    totalRecords: 0,
    totalPages: 0,
    firstItem: 0,
    lastItem: 0,
    withPaging: true,
  };
}
