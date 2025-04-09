export class AuthTokensResponse {
  private constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) { }

  public static create(
    accessToken: string,
    refreshToken: string,
  ): AuthTokensResponse {
    return new AuthTokensResponse(
      accessToken,
      refreshToken,
    );
  }
}
