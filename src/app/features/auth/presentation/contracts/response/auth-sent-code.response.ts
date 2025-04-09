export class AuthSentCodeResponse {
  private constructor(
    public readonly code: string,
    public readonly sentTo: string,
    public readonly expiresIn: number,
  ) { }

  public static create(
    code: string,
    sentTo: string,
    expiresIn: number,
  ): AuthSentCodeResponse {
    return new AuthSentCodeResponse(
      code,
      sentTo,
      expiresIn,
    );
  }
}
