export class UsersVerifyCommand {
  public constructor(
    public readonly id: string,
    public readonly isVerified: boolean,
  ) { }
}