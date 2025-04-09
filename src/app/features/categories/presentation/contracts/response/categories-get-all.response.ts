import { CategoriesGetResponse } from "./categories-get.response";

export class CategoriesGetAllResponse {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly TagName: string,
    public readonly parentId: string | null,
    public readonly parent: CategoriesGetResponse,
    public readonly displayOrder: number,
  ) { }
}