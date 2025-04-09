import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user";
import { UserSchema } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchemaFactory } from "../factories/user-schema.factory";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";

@Injectable()
export class UsersRepository
  extends BaseRepository<UserSchema, User> {
  public constructor(
    @InjectModel(UserSchema.name)
    public readonly model: Model<UserSchema>,
    public readonly schemaFactory: UserSchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }

  public async getByEmail(
    email: string
  ): Promise<User | null> {
    const entity =
      await this
        .get(
          {
            email: email
          },
        )

    return entity;
  }

  public async getByPhoneNumber(
    phoneNumber: string
  ): Promise<User | null> {
    const entity =
      await this
        .get(
          {
            phoneNumber: phoneNumber
          },
        )

    return entity;
  }
}