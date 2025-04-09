import { CategoriesGetResult } from "./categories-get.result";

export class CategoriesGetAllResult {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly TagName: string,
    public readonly parentId: string | null,
    public readonly parent: CategoriesGetResult | null,
    public readonly displayOrder: number,
  ) { }

  public static create(
    id: string,
    name: string,
    TagName: string,
    parentId: string | null,
    parent: CategoriesGetResult | null,
    displayOrder: number,
  ): CategoriesGetAllResult {
    return new CategoriesGetAllResult(
      id,
      name,
      TagName,
      parentId,
      parent,
      displayOrder,
    );
  }
}