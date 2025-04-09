export class AuthRefreshCommand {
  public constructor(
    public readonly refreshToken: string,
  ) { }
}