import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { MediaSchema } from "../schemas/media.schema";
import { Media } from "../../domain/entities/media";
import { MediaSchemaFactory } from "../factories/media-schema.factory";

@Injectable()
export class MediasRepository
  extends BaseRepository<MediaSchema, Media> {
  public constructor(
    @InjectModel(MediaSchema.name)
    public readonly model: Model<MediaSchema>,
    public readonly schemaFactory: MediaSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }
}