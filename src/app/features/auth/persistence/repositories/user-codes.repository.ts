import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { UserCodeSchema } from "../schemas/user-code.schema";
import { UserCode } from "../../domain/entities/user-code";
import { UserCodeSchemaFactory } from "../factories/user-code-schema.factory";

@Injectable()
export class UserCodesRepository
  extends BaseRepository<UserCodeSchema, UserCode> {
  public constructor(
    @InjectModel(UserCodeSchema.name)
    public readonly model: Model<UserCodeSchema>,
    public readonly schemaFactory: UserCodeSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }

  public async checkIfExists(
    email: string,
    code: string,
    type: string,
  ): Promise<UserCode | null> {
    const entity =
      await this
        .get(
          {
            sentTo: email,
            code: code,
            type: type,
          },
        )

    return entity;
  }
}