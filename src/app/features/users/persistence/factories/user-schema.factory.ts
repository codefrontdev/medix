import { Injectable } from "@nestjs/common";
import { UserSchema } from "../schemas/user.schema";
import { User } from "../../domain/entities/user";
import { ObjectId } from "mongodb";
import { SchemaFactory } from "src/app/@core/shared/persistence/factories/schema.factory";
import { createObjectId, fromObjectId } from "src/app/@core/utils/functions/mongo-functions";

@Injectable()
export class UserSchemaFactory
  implements SchemaFactory<UserSchema, User> {
  public create(
    entity: User,
  ): UserSchema {
    return {
      _id:
        createObjectId(
          entity._id,
        ),
      nickName: entity.nickName,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      isEmailConfirmed: entity.isEmailConfirmed,
      isPhoneNumberConfirmed: entity.isPhoneNumberConfirmed,
      password: entity.password,
      role: entity.role,
      gender: entity.gender,
      accountType: entity.accountType,
      region: entity.region,
      city: entity.city,
      address: entity.address,
      identityType: entity.identityType,
      identityNo: entity.identityNo,
      residenceNo: entity.residenceNo,
      dateOfBirth: entity.dateOfBirth,
      isVerified: entity.isVerified,
      displayOrder: entity.displayOrder,
      isVisible: entity.isVisible,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      deletedBy: entity.deletedBy,
    };
  }

  public createFromSchema(
    entitySchema: UserSchema,
  ): User {
    return new User(
      fromObjectId(
        entitySchema._id,
      ),
      entitySchema.nickName,
      entitySchema.email,
      entitySchema.phoneNumber,
      entitySchema.isEmailConfirmed,
      entitySchema.isPhoneNumberConfirmed,
      entitySchema.password,
      entitySchema.role,
      entitySchema.gender,
      entitySchema.accountType,
      entitySchema.region,
      entitySchema.city,
      entitySchema.address,
      entitySchema.identityType,
      entitySchema.identityNo,
      entitySchema.residenceNo,
      entitySchema.dateOfBirth,
      entitySchema.isVerified,
      entitySchema.displayOrder,
      entitySchema.isVisible,
      entitySchema.createdAt,
      entitySchema.updatedAt,
      entitySchema.deletedAt,
      entitySchema.createdBy,
      entitySchema.updatedBy,
      entitySchema.deletedBy,
    )
  }
}