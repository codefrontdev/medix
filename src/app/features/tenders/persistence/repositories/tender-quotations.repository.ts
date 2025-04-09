import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { TenderQuotationSchema } from "../schemas/tender-quotation.schema";
import { TenderQuotationSchemaFactory } from "../factories/tender-quotation-schema.factory";
import { TenderQuotation } from "../../domain/entities/tender-quotation";

@Injectable()
export class TenderQuotationsRepository extends BaseRepository<TenderQuotationSchema, TenderQuotation> {
  public constructor(
    @InjectModel(TenderQuotationSchema.name)
    public readonly model: Model<TenderQuotationSchema>,
    public readonly schemaFactory: TenderQuotationSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }
}