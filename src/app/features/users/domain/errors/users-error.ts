import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class UsersError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }

  public static readonly emailTaken = new AppError(
    appMessagesKeys.emailTaken,
    'Email already taken',
  );

  public static readonly phoneNumberTaken = new AppError(
    appMessagesKeys.phoneNumberTaken,
    'PhoneNumber already taken',
  );
}