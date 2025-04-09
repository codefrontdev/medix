import { AppError } from "./app-error";
import { AppPaging } from "./app-paging";

export class AppResult<T> {
  public constructor(
    public readonly isSuccess: boolean,
    public readonly key?: string,
    public readonly message?: string,
    public readonly data?: T,
    public readonly paging?: AppPaging,
    public readonly error?: AppError,
  ) { }

  public get isFailure(): boolean {
    return !this.isSuccess;
  }

  public static create<T>(
    isSuccess: boolean,
    key?: string,
    message?: string,
    data?: T,
    paging?: AppPaging,
    error?: AppError,
  ): AppResult<T> {
    return new AppResult<T>(
      isSuccess,
      key,
      message,
      data,
      paging,
      error,
    );
  }

  public static createSuccess<T>(
    key?: string,
    message?: string,
    data?: T,
    paging?: AppPaging,
  ): AppResult<T> {
    return new AppResult<T>(
      true,
      key,
      message,
      data,
      paging,
      null,
    );
  }

  public static createError(
    error: AppError,
  ): AppResult<null> {
    return new AppResult<null>(
      false,
      null,
      null,
      null,
      null,
      error,
    );
  }
}