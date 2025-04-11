import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppError } from 'src/app/@core/shared/domain/shared/app-error';

export class AuthError extends AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
    public readonly statusCode: number = 400
  ) {
    super(code, message, statusCode);
  }

  public static emailOrPhoneNotExist(byEmail: boolean): AppError {
  
     return new AuthError(
       byEmail ?
         appMessagesKeys.emailNotExist
       : appMessagesKeys.phoneNumberNotExist,
       byEmail ? "Email not exist" : "Phone number not exist",
       404
     );
  }

  public static readonly emailNotConfirmed = new AppError(
    appMessagesKeys.emailNotConfirmed,
    "The email is not confirmed",
    404
  );

  public static readonly phoneNotConfirmed = new AppError(
    appMessagesKeys.phoneNotConfirmed,
    "The phone is not confirmed",
    404
  );

  public static accountIsLocked(remainTime: {
    hours: number;
    minutes: number;
  }): AppError {
    let timeMessage = "";

    if (remainTime.hours > 0) {
      timeMessage = `${remainTime.hours} hours`;
    }

    if (remainTime.minutes > 0) {
      timeMessage += timeMessage ? ", " : "";
      timeMessage += `${remainTime.minutes} minute(s)`;
    } else if (remainTime.hours === 0) {
      timeMessage = "less than a minute";
    }

    return new AppError(
      appMessagesKeys.accountIsLocked,
      `The account is locked for ${timeMessage}`,
      403
    );
  }

  public static readonly accountIsLockedPermanently = new AppError(
    appMessagesKeys.accountIsLockedPermanently,
    "Account is locked",
    403
  );

  public static readonly passwordIncorrect = new AppError(
    appMessagesKeys.passwordIncorrect,
    "Password incorrect",
    401
  );

  public static readonly invalidCode = new AppError(
    appMessagesKeys.invalidCode,
    "Invalid code",
    400
  );

  public static readonly login2FAInvalidCode = new AppError(
    appMessagesKeys.login2FAInvalid,
    "Login 2FA Invalid code"
  );

  public static readonly emailTaken = new AppError(
    appMessagesKeys.emailTaken,
    "Email already taken"
  );

  public static readonly phoneNumberTaken = new AppError(
    appMessagesKeys.phoneNumberTaken,
    "PhoneNumber already taken"
  );

  public static readonly resetCodeEmpty = new AppError(
    appMessagesKeys.codeIsEmpty,
    "Code is empty"
  );

  public static readonly phoneAlreadyConfirmed = new AppError(
    appMessagesKeys.phoneAlreadyConfirmed,
    "Phone number already confirmed"
  );

  public static readonly emailAlreadyConfirmed = new AppError(
    appMessagesKeys.emailAlreadyConfirmed,
    "Email already confirmed"
  );

  public static readonly reset2FAGenerateFailed = new AppError(
    appMessagesKeys.reset2FAGenerateFailed,
    "Generating code failed"
  );

  public static readonly deviceIdNotSame = new AppError(
    appMessagesKeys.deviceIdNotSame,
    "Device ID not the same in your account"
  );

  public static readonly alternativeDeviceIdEmpty = new AppError(
    appMessagesKeys.alternativeDeviceIdEmpty,
    "AlternativeDeviceId is empty"
  );

  public static readonly userLoggedIn = new AppError(
    appMessagesKeys.accountRestricted,
    "We've detected an issue with your account. For your security, we've temporarily restricted access."
  );

  public static readonly invalidToken = new AppError(
    appMessagesKeys.invalidToken,
    "Invalid access token"
  );

  public static readonly invalidRefreshToken = new AppError(
    appMessagesKeys.invalidRefreshToken,
    "Invalid refresh token"
  );

  public static readonly refreshTokenExpired = new AppError(
    appMessagesKeys.refreshTokenExpired,
    "Refresh token has expired"
  );

  public static readonly codeExpired = new AppError(
    appMessagesKeys.codeExpired,
    "Code has expired"
  );

  public static readonly accessTokenNotExpired = new AppError(
    appMessagesKeys.accessTokenNotExpired,
    "Access token not expired"
  );

  public static readonly userNotLoggedIn = new AppError(
    appMessagesKeys.userNotLoggedIn,
    "User not logged in"
  );

  public static readonly securityError = new AppError(
    appMessagesKeys.securityError,
    "There is a security error, please contact support."
  );

  public static readonly errorWhileSendingEmail = new AppError(
    appMessagesKeys.errorWhileSendingEmail,
    "Error while sending email"
  );
}