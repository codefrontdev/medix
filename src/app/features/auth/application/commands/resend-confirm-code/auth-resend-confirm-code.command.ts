export class AuthResendConfirmCodeCommand {
  public constructor(
    public readonly email: string,
  ) { }
}