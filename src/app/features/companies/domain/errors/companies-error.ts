import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class CompaniesError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }

  public static readonly duplicateRegistrationNumber = new AppError(
    appMessagesKeys.duplicateRegistrationNumber,
    'Duplicate registration number',
    409
  );
}