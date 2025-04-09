export class ItemsResponse {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status?: string,
    public readonly type?: string,
  ) {}

  public static create(
    id: string,
    name: string,
    status?: string,
    type?: string,
  ): ItemsResponse {
    return new ItemsResponse(id, name, status, type);
  }
}
