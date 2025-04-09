import { AggregateRoot } from '@nestjs/cqrs';
import { BaseSchema } from '../schemas/base.schema';


export interface SchemaFactory
  <TSchema extends BaseSchema,
    TEntity extends AggregateRoot> {
  create(
    entity: TEntity,
  ): TSchema;

  createFromSchema(
    entitySchema: TSchema,
  ): TEntity;
}