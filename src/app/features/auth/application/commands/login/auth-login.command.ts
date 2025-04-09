export class AuthLoginCommand {
  public constructor(
    public readonly email: string,
    public readonly password: string,
  ) { }
}