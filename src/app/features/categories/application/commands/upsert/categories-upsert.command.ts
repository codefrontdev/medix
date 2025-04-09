export class CategoriesUpsertCommand {
  public constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly TagName: string,
    public readonly parentId: string | null,
    public readonly displayOrder: number,
  ) { }
}