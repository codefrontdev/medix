import { Injectable } from "@nestjs/common";
import { UserCode } from "../../domain/entities/user-code";
import { UserCodeSchema } from "../schemas/user-code.schema";
import { SchemaFactory } from "src/app/@core/shared/persistence/factories/schema.factory";
import { ObjectId } from 'mongodb';
import { createObjectId, fromObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class UserCodeSchemaFactory
  implements SchemaFactory<UserCodeSchema, UserCode> {
  public create(
    entity: UserCode,
  ): UserCodeSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      code: entity.code,
      type: entity.type,
      sentTo: entity.sentTo,
      userId:
        createObjectId(
          entity.userId,
        ),
      expirationDate: entity.expirationDate,
    };
  }
  public createFromSchema(
    entitySchema: UserCodeSchema,
  ): UserCode {
    return new UserCode(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.code,
      entitySchema.type,
      entitySchema.sentTo,
      fromObjectId(
        entitySchema.userId,
      ),
      entitySchema.expirationDate,
    )
  }
}