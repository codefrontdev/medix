import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { OrderSchema } from "../schemas/order.schema";
import { Order } from "../../domain/entities/order";
import { OrderSchemaFactory } from "../factories/order-schema.factory";

@Injectable()
export class OrdersRepository extends BaseRepository<OrderSchema, Order> {
  public constructor(
    @InjectModel(OrderSchema.name)
    public readonly model: Model<OrderSchema>,
    public readonly schemaFactory: OrderSchemaFactory,
  ) {
    super(model, schemaFactory);
  }

  /**
   * Get the latest order by OrderNr.
   * @returns The latest order schema or null if no orders exist.
   */
  public async getLatestOrder(): Promise<OrderSchema | null> {
    return this.model
      .findOne() // Fetch a single document
      .sort({ OrderNr: -1 }) // Sort by OrderNr in descending order
      .exec(); // Execute the query
  }
}
