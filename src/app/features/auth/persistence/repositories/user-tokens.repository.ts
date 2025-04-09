import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { UserTokenSchema } from "../schemas/user-token.schema";
import { UserToken } from "../../domain/entities/user-token";
import { UserTokenSchemaFactory } from "../factories/user-token-schema.factory";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class UserTokensRepository
  extends BaseRepository<UserTokenSchema, UserToken> {
  public constructor(
    @InjectModel(UserTokenSchema.name)
    public readonly model: Model<UserTokenSchema>,
    public readonly schemaFactory: UserTokenSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }

  public async getByRefreshToken(
    refreshToken: string
  ): Promise<UserToken | null> {
    const entity =
      await this
        .get(
          {
            refreshToken: refreshToken
          },
        )

    return entity;
  }

  public async getByUserId(
    userId: string
  ): Promise<UserToken | null> {
    const entity =
      await this
        .get(
          {
            userId:
              createObjectId(
                userId,
              ),
          },
        )

    return entity;
  }
}