import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class OrdersError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }

  public static acceptQuotationMustHasQuotationId(): AppError {
    return new AppError(
      appMessagesKeys.notRelateToYourAccount,
      `Accept order must has order id`,
    );
  }
}