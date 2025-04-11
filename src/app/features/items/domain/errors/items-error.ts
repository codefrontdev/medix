import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class ItemsError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }
  public static stockMustBeZeroForOutOfStock(): AppError {
    return new AppError(
      appMessagesKeys.invalidStockOperation,
      `Stock must be zero to mark the item as OutOfStock.`,

    );
  }
  public static stockMustBeGreaterThanZero(): AppError {
    return new AppError(
      appMessagesKeys.invalidStock,
      `Stock must be greater than zero for this operation.`,
      400
    );
  }

  public static invalidItemType(): AppError {
    return new AppError(
      appMessagesKeys.invalidType,
      `The item type provided is invalid.`,
      400
    );
  }

  public static itemNotFound(): AppError {
    return new AppError(
      appMessagesKeys.notFound,
      `The requested item could not be found.`,
      404
    );
  }

  public static userNotAuthorized(): AppError {
    return new AppError(
      appMessagesKeys.notRelateToYourAccount,
      `You are not authorized to perform this action.`,
      403
    );
  }

  public static requiredFieldMissing(fieldName: string): AppError {
    return new AppError(
      appMessagesKeys.requiredField,
      `The field '${fieldName}' is required.`,
      400
    );
  }
}
