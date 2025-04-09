export class AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
  ) {
  }
}