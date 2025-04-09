export class AuthSentCodeResult {
  private constructor(
    public readonly code: string,
    public readonly sentTo: string,
    public readonly expiresIn: number,
  ) { }

  public static create(
    code: string,
    sentTo: string,
    expiresIn: number,
  ): AuthSentCodeResult {
    return new AuthSentCodeResult(
      code,
      sentTo,
      expiresIn,
    );
  }
}
