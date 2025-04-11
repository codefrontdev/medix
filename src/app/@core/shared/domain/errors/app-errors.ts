/** @format */

import { appMessagesKeys } from "../../../values/app-messages-keys";
import { AppError } from "../shared/app-error";

export class AppErrors extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,

    public readonly statusCode: number = 400
  ) {
    super(code, message, statusCode);
  }

  public static operationFailed(): AppError {
    return new AppError(
      appMessagesKeys.operationFailed,
      "Operation failed",
      400
    );
  }

  public static nullValue(field: string): AppError {
    return new AppError(appMessagesKeys.nullValue, `${field} is null`, 404);
  }

  public static notRelateToYourAccount(): AppError {
    return new AppError(
      appMessagesKeys.notRelateToYourAccount,
      `Not related to your account`,
      403
    );
  }
}
