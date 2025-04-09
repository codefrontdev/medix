import { AggregateRoot } from "@nestjs/cqrs";
import { toProtectedPath } from "../constants/medias-constants";
import { ObjectId } from "mongodb";
import { createObjectIdAsString } from "src/app/@core/utils/functions/mongo-functions";

export class Media extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public url: string,
    public readonly uniqueName: string,
    public readonly name: string,
    public readonly size: number,
    public readonly type: string,
    public readonly companyId: string,
    public readonly userId: string,
    public readonly sourceType: string,
    public readonly source: string,
    public readonly isProtected: boolean,
    public readonly displayOrder: number,
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

  public static create(
    id: string | null,
    url: string,
    uniqueName: string,
    name: string,
    size: number,
    type: string,
    companyId: string,
    userId: string,
    sourceType: string,
    source: string,
    isProtected: boolean,
  ): Media {
    const entity =
      new Media(
        createObjectIdAsString(
          id,
        ),
        url,
        uniqueName,
        name,
        size,
        type,
        companyId,
        userId,
        sourceType,
        source,
        isProtected,
        0,
        true,
        null,
        null,
        null,
        null,
        null,
        null,
      );



    return entity;
  }

  public get fullUrl(): string {
    return this.isProtected ?
      toProtectedPath(
        this.url,
      )
      :
      this.url;
  }

  public getFileSizeString(): string {
    if (this.size < 1024) {
      return `${this.size} B`;
    }

    if (this.size < 1024 * 1024) {
      return `${this.size / 1024} KB`;
    }

    return `${this.size / (1024 * 1024)} MB`;
  }
}