import { AggregateRoot } from "@nestjs/cqrs";

export class Category extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public name: string,
    public TagName: string,
    public parentId: string | null,
    public parent: Category | null,
    public displayOrder: number,
    public readonly isVisible: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string,
    public readonly deletedBy?: string,
  ) {
    super();
  }
}