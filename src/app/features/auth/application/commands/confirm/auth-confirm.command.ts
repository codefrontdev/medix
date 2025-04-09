export class AuthConfirmCommand {
  public constructor(
    public readonly email: string,
    public readonly code: string,
  ) { }
}