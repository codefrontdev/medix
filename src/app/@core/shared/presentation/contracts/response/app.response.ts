/** @format */

import { appMessagesKeys } from "../../../../values/app-messages-keys";
import { AppError } from "../../../domain/shared/app-error";
import { AppPagingResponse } from "./app-paging.response";

export class AppResponse<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly key?: string,
    public readonly message?: string,
    public readonly data?: T,
    public readonly paging?: AppPagingResponse
  ) {}

  public static create<T>(
    isSuccess: boolean,
    key?: string,
    message?: string,
    data?: T,
    paging?: AppPagingResponse,
    error?: AppError
  ): AppResponse<T> {
    const processedKey = AppResponse.getKey(key, error);

    const processedMessage = AppResponse.getMessage(message, error);

    return new AppResponse(
      isSuccess,
      processedKey ?? null,
      processedMessage ?? null,
      data,
      paging
    );
  }
  private static getKey(key?: string, error?: AppError): string | null {
    var isKeyEmpty = key == null || key == "";

    if (!isKeyEmpty) {
      return key;
    }

    var hasError = error != null;

    if (!hasError) {
      return appMessagesKeys.operationSucceeded;
    }

    return error.code;
  }

  private static getMessage(message?: string, error?: AppError): string | null {
    var isMessageEmpty = message == null || message == "";

    if (!isMessageEmpty) {
      return message;
    }

    var hasError = error != null;

    if (!hasError) {
      return appMessagesKeys.operationSucceeded;
    }

    return error?.message;
  }
}
