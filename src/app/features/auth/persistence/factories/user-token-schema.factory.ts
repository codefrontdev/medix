import { Injectable } from "@nestjs/common";
import { UserToken } from "../../domain/entities/user-token";
import { UserTokenSchema } from "../schemas/user-token.schema";
import { SchemaFactory } from "src/app/@core/shared/persistence/factories/schema.factory";
import { ObjectId } from 'mongodb';
import { createObjectId, fromObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class UserTokenSchemaFactory
  implements SchemaFactory<UserTokenSchema, UserToken> {
  public create(
    entity: UserToken,
  ): UserTokenSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      accessToken: entity.accessToken,
      refreshToken: entity.refreshToken,
      userId:
        createObjectId(
          entity.userId,
        ),
      expirationDate: entity.expirationDate,
    };
  }
  public createFromSchema(
    entitySchema: UserTokenSchema,
  ): UserToken {
    return new UserToken(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.accessToken,
      entitySchema.refreshToken,
      fromObjectId(
        entitySchema.userId,
      ),
      entitySchema.expirationDate,
    )
  }
}