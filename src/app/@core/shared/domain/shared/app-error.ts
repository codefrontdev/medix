export class AppError {
  public constructor(
    public readonly code?: string,
    public readonly message?: string,
    public readonly statusCode: number = 400
  ) {}
}