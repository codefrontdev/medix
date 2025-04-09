import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, FlattenMaps, IfAny, Model, Query, Require_id, SortOrder } from 'mongoose';
import { SchemaFactory } from '../factories/schema.factory';
import { BaseSchema } from '../schemas/base.schema';
import { AppResult } from '../../domain/shared/app-result';
import { AppPaging } from '../../domain/shared/app-paging';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';
import { nowUtc } from 'src/app/@core/utils/functions/date-functions';
import { OrderByEnum } from 'src/app/@core/values/enums/order-by.enum';
import { OrderDirectionEnum } from 'src/app/@core/values/enums/order-direction.enum';

export class BaseRepository
  <TSchema extends BaseSchema,
    TEntity extends AggregateRoot> {
  public constructor(
    protected readonly model: Model<TSchema>,
    protected readonly schemaFactory: SchemaFactory<TSchema, TEntity>,
  ) { }

  public async getById(
    id: string,
    projection?: Record<string, unknown>,
    populateOptions?: Array<{ path: string, select?: string }>,
  ): Promise<TEntity | null> {
    const filter: FilterQuery<TSchema> =
    {
      _id:
        createObjectId(
          id,
        ),
    };

    return await this
      .get(
        filter,
        projection,
        populateOptions,
      );
  }
  public async getAndReplaceById(
    id: string,
    entity: TEntity,
  ): Promise<TEntity | null> {
    const filter: FilterQuery<TSchema> =
    {
      _id:
        createObjectId(
          id,
        ),
    };

    return await this
      .getAndUpdate(
        filter,
        entity,
      );
  }
  public async get(
    filterQuery?: FilterQuery<TSchema>,
    projection?: Record<string, unknown>,
    populateOptions?: Array<{ path: string, select?: string }>,
  ): Promise<TEntity | null> {
    let query =
      this
        .model
        .findOne(
          filterQuery,
          {
            ...projection,
          },
          {
            lean: true,
          },
        );

    if (populateOptions != null && populateOptions.length > 0) {
      populateOptions.forEach(
        option => {
          query =
            query
              .populate(
                option.path,
                option.select,
              );
        },
      );
    }

    const entityDocument =
      await query
        .exec();

    if (entityDocument === null) {
      return null;
    }

    return this
      .schemaFactory
      .createFromSchema(
        entityDocument as TSchema,
      );
  }

  public async getAll(
    filterQuery?: FilterQuery<TSchema>,
    projection?: Record<string, unknown>,
    populateOptions?: Array<{ path: string, select?: string }>,
    orderByCriteria?: Array<{ field: OrderByEnum, direction: OrderDirectionEnum }>,
  ): Promise<TEntity[]> {
    let query =
      this
        .model
        .find(
          filterQuery,
          {
            ...projection,
          },
          {
            lean: true,
          },
        );

    query =
      this
        .orderBy(
          query,
          orderByCriteria,
        );

    if (populateOptions != null && populateOptions.length > 0) {
      populateOptions.forEach(
        option => {
          query =
            query
              .populate(
                option.path,
                option.select,
              );
        },
      );
    }

    const entityDocuments =
      await query
        .exec();

    return entityDocuments
      .map(
        entityDocument =>
          this
            .schemaFactory
            .createFromSchema(
              entityDocument as TSchema,
            ),
      );
  }

  public async getAllAsResult(
    filterQuery?: FilterQuery<TSchema>,
    projection?: Record<string, unknown>,
    populateOptions?: Array<{ path: string, select?: string }>,
    pageSize: number = 10,
    pageNumber: number = 1,
    withPaging: boolean = true,
    orderByCriteria?: Array<{ field: OrderByEnum, direction: OrderDirectionEnum }>,
  ): Promise<AppResult<TEntity[]>> {
    const skip =
      withPaging ?
        (pageNumber - 1) * pageSize
        :
        0;

    const take =
      withPaging ?
        pageSize
        :
        0;

    let query =
      this
        .model
        .find(
          filterQuery,
          {
            ...projection,
          },
          {
            lean: true,
          },
        );

    query =
      this
        .orderBy(
          query,
          orderByCriteria,
        );

    if (withPaging) {
      query =
        query
          .skip(
            skip,
          )
          .limit(
            take,
          );
    }

    if (populateOptions != null && populateOptions.length > 0) {
      populateOptions.forEach(
        option => {
          query =
            query
              .populate(
                option.path,
                option.select,
              );
        },
      );
    }

    const totalRecords =
      !withPaging ?
        0
        :
        await
          this
            .model
            .countDocuments(
              filterQuery,
            );

    const appPaging =
      !withPaging ?
        null
        :
        AppPaging
          .calc(
            withPaging,
            totalRecords,
            pageSize,
            pageNumber,
          );

    const entityDocuments =
      await query
        .exec();

    const entities =
      entityDocuments
        .map(
          entityDocument =>
            this
              .schemaFactory
              .createFromSchema(
                entityDocument as TSchema,
              ),
        );

    return AppResult
      .createSuccess(
        null,
        null,
        entities,
        appPaging,
      );
  }

  public async insert(
    entity: TEntity,
  ): Promise<void> {
    var schema =
      this
        .schemaFactory
        .create(
          entity,
        );

    schema =
      this
        .prepareDateForSchema(
          schema,
          true,
          false,
          false,
        );

    const model =
      new
        this
          .model(
            schema,
          );

    await
      model
        .save();
  }

  public async insertAll(
    entities: TEntity[],
  ): Promise<void> {
    const preparedEntities =
      entities
        .map(
          entity => {
            const schema =
              this
                .schemaFactory
                .create(
                  entity,
                );

            return this
              .prepareDateForSchema(
                schema,
                true,
                false,
                false,
              );
          },
        );

    await this
      .model
      .insertMany(
        preparedEntities,
      );
  }

  public async getAndUpdate(
    filterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<TEntity | null> {
    var schema =
      this
        .schemaFactory
        .create(
          entity,
        );

    schema =
      this
        .prepareDateForSchema(
          schema,
          false,
          true,
          false,
        );

    const updatedEntityDocument =
      await this
        .model
        .findOneAndReplace(
          filterQuery,
          schema,
          {
            new: true,
            useFindAndModify: false,
            lean: true,
          },
        );

    if (updatedEntityDocument === null) {
      return null;
    }

    return entity;
  }

  public async getAndDelete(
    filterQuery: FilterQuery<TSchema>,
  ): Promise<TEntity | null> {
    const deletedEntityDocument =
      await this
        .model
        .findOneAndDelete(
          filterQuery,
        );

    if (deletedEntityDocument === null) {
      return null;
    }

    const entity =
      this
        .schemaFactory
        .createFromSchema(
          deletedEntityDocument,
        );

    return entity;
  }

  public async deleteById(
    id: string,
  ): Promise<boolean> {
    const filter: FilterQuery<TSchema> =
    {
      _id:
        createObjectId(
          id,
        ),
    };

    return await this.delete(
      filter,
    );
  }
  public async delete(
    filterQuery: FilterQuery<TSchema>,
  ): Promise<boolean> {
    const deleteResult =
      await this
        .model
        .deleteOne(
          filterQuery,
        );

    return deleteResult.deletedCount >= 1;
  }

  public async deleteAll(
    filterQuery: FilterQuery<TSchema>,
  ): Promise<boolean> {
    const deleteResult =
      await this
        .model
        .deleteMany(
          filterQuery,
        );

    return deleteResult.deletedCount >= 1;
  }

  private prepareDateForSchema(
    schema: TSchema,
    withCreatedAt: boolean = false,
    withUpdatedAt: boolean = false,
    withDeleteAt: boolean = false,
  ): TSchema {
    const hasDates =
      this
        .hasDates(
          schema,
        );

    if (!hasDates && !withCreatedAt && !withUpdatedAt && !withDeleteAt) {
      return schema;
    }

    const schemaWithDates = schema as any;

    if (withCreatedAt) {
      schemaWithDates.createdAt = nowUtc();
      schemaWithDates.updatedAt = nowUtc();
    }

    if (withUpdatedAt) {
      schemaWithDates.updatedAt = nowUtc();
    }

    if (withDeleteAt) {
      schemaWithDates.deletedAt = nowUtc();
    }

    return schema;
  }

  private hasDates(
    object: any,
  ): boolean {

    const hasCreatedAt = object != null && typeof object.createdAt !== 'undefined';
    const hasUpdatedAt = object != null && typeof object.updatedAt !== 'undefined';
    const hasDeletedAt = object != null && typeof object.deletedAt !== 'undefined';

    return hasCreatedAt && hasUpdatedAt && hasDeletedAt;
  }

  private orderBy(
    query: Query<any, any, {}, TSchema, "find", {}>,
    orderByCriteria?: Array<{ field: OrderByEnum, direction: OrderDirectionEnum }>,
  ): Query<any, any, {}, TSchema, "find", {}> {
    if (orderByCriteria != null && orderByCriteria.length != 0) {
      const sortCriteria =
        orderByCriteria.
          reduce(
            (acc, { field, direction }) => {
              acc[field] =
                direction === OrderDirectionEnum.ASC ?
                  1
                  :
                  -1;

              return acc;
            },
            {} as Record<string, number>,
          );

      query =
        query
          .sort(
            sortCriteria as { [key: string]: SortOrder },
          );
    }

    return query;
  }
  public async updateStatus(
    id: string,
    status: string,
  ): Promise<boolean> {
    // Create a filter query to find the document by ID
    const filter: FilterQuery<TSchema> = {
      _id: createObjectId(id),
    };
  
    // Prepare the update object
    const update = {
      status: status,
      updatedAt: nowUtc(), // Optionally update the `updatedAt` field
    };
  
    // Execute the update operation
    const updateResult = await this.model.updateOne(filter, update);
  
    // Return `true` if the update was successful (at least one document was modified)
    return updateResult.modifiedCount > 0;
  }
}