export class TokenValidationResult {
  public constructor(
    public readonly isValid: boolean,
    public readonly payload: any,
  ) {
  }
}