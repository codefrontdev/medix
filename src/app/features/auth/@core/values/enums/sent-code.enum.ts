import { appConstants } from "src/app/@core/values/app-constants";

export class SentCodeEnum {
  private constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly alphabet: string,
    public readonly length: number,
  ) {
  }

  public static get resetPassword(): SentCodeEnum {
    return new SentCodeEnum(
      'ResetPassword',
      'Reset Password',
      appConstants.digits + appConstants.letters,
      8,
    );
  }

  public static get emailConfirmation(): SentCodeEnum {
    return new SentCodeEnum(
      'EmailConfirmation',
      'Email Confirmation',
      appConstants.digits,
      6,
    );
  }

  public static get phoneNumberConfirmation(): SentCodeEnum {
    return new SentCodeEnum(
      'PhoneNumberConfirmation',
      'Phone Number Confirmation',
      appConstants.digits,
      6,
    );
  }
}