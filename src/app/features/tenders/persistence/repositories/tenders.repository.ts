import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { TenderSchema } from "../schemas/tender.schema";
import { Tender } from "../../domain/entities/tender";
import { TenderSchemaFactory } from "../factories/tender-schema.factory";

@Injectable()
export class TendersRepository extends BaseRepository<TenderSchema, Tender> {
  public constructor(
    @InjectModel(TenderSchema.name)
    public readonly model: Model<TenderSchema>,
    public readonly schemaFactory: TenderSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }
   public async getLatestTender(): Promise<TenderSchema | null> {
      return this.model
        .findOne() // Fetch a single document
        .sort({ TenderNr: -1 }) // Sort by OrderNr in descending order
        .exec(); // Execute the query
    }
}