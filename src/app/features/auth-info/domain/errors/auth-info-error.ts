import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class AuthInfoError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
    super(
      code,
      message,
    );
  }

  public static readonly userTokenNotFoundToLogout = new AppError(
    appMessagesKeys.userTokenNotFoundToLogout,
    'User token not found to logout',
  );

  public static readonly userNotFound = new AppError(
    appMessagesKeys.userNotFound,
    'User token not found',
  );

  public static readonly passwordIncorrect = new AppError(
    appMessagesKeys.passwordIncorrect,
    'Password incorrect',
  );
} 