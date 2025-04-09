import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class TransformsError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }
  public static invalidStatusTransition(textE:string): AppError {
    return new AppError(
      appMessagesKeys.invalidStockOperation,
      textE,
    );
  }
  public static stockMustBeZeroForOutOfStock(): AppError {
    return new AppError(
      appMessagesKeys.invalidStockOperation,
      `Stock must be zero to mark the Transform as OutOfStock.`,
    );
  }
  public static stockMustBeGreaterThanZero(): AppError {
    return new AppError(
      appMessagesKeys.invalidStock,
      `Stock must be greater than zero for this operation.`,
    );
  }

  public static invalidTransformType(): AppError {
    return new AppError(
      appMessagesKeys.invalidType,
      `The Transform type provided is invalid.`,
    );
  }

  public static TransformNotFound(): AppError {
    return new AppError(
      appMessagesKeys.notFound,
      `The requested Transform could not be found.`,
    );
  }

  public static userNotAuthorized(): AppError {
    return new AppError(
      appMessagesKeys.notRelateToYourAccount,
      `You are not authorized to perform this action.`,
    );
  }

  public static requiredFieldMissing(fieldName: string): AppError {
    return new AppError(
      appMessagesKeys.requiredField,
      `The field '${fieldName}' is required.`,
    );
  }
}
