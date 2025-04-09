export class TransformsResponse {
  private constructor(
    public readonly id: string, // Transform ID
    public readonly title: string, // Transform title
    public readonly status?: string, // Transform status (optional)
  ) {}

  public static create(
    id: string,
    title: string,
    status?: string
  ): TransformsResponse {
    return new TransformsResponse(id, title, status);
  }
}
