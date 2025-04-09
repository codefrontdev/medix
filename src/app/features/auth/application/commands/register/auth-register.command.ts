export class AuthRegisterCommand {
  public constructor(
    public readonly nickName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
  ) { }
}