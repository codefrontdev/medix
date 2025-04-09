import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { schemasNames } from "src/app/@core/shared/persistence/constants/schemas-names";
import { BaseWithInfoSchema } from "src/app/@core/shared/persistence/schemas/base-with-Info.schema";
import { Category } from "../../domain/entities/category";

@Schema(
  {
    collection: schemasNames.categories,
    versionKey: false,
    timestamps: false,
  },
)
export class CategorySchema extends BaseWithInfoSchema {
  @Prop(
    {
      required: false,
    },
  )
  public readonly name: string;
  @Prop(
    {
      required: false,
    },
  )
  public readonly TagName: string;

  @Prop(
    {
      required: false,
      index: true,
      type: Types.ObjectId,
      ref: CategorySchema.name,
    },
  )
  public readonly parentId?: ObjectId;

  public readonly parent: Category | null;
}

export const CreatedCategorySchema =
  SchemaFactory
    .createForClass(
      CategorySchema,
    );

CreatedCategorySchema
  .virtual(
    'parent',
    {
      ref: CategorySchema.name,
      localField: 'parentId',
      foreignField: '_id',
      justOne: true,
    },
  );


CreatedCategorySchema
  .set(
    'toJSON',
    {
      virtuals: true,
    },
  );

CreatedCategorySchema
  .set(
    'toObject',
    {
      virtuals: true,
    },
  );