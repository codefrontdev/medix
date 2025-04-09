export class AuthInfoChangePasswordCommand {
  public constructor(
    public readonly userId: string,
    public readonly oldPassword: string,
    public readonly newPassword: string,
  ) { }
}