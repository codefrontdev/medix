import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { Transform } from "../../domain/entities/transform";


import {  TransformSchemaFactory } from "../factories/transform-schema.factory";
import { TransformSchema } from "../schemas/stransform.schema";


@Injectable()
export class TransformsRepository 
extends BaseRepository<TransformSchema, Transform> {
  public constructor(
    @InjectModel(TransformSchema.name) // Inject the Mongoose model
    public readonly model: Model<TransformSchema>,
    public readonly schemaFactory: TransformSchemaFactory, // Inject the factory
  ) {
    super(model, schemaFactory); // Pass to the BaseRepository constructor
  }
}