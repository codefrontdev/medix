export class AuthTokensResult {
  private constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) { }

  public static create(
    accessToken: string,
    refreshToken: string,
  ): AuthTokensResult {
    return new AuthTokensResult(
      accessToken,
      refreshToken,
    );
  }
}
