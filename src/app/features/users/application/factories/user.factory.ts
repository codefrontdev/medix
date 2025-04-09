import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { UsersRepository } from '../../persistence/repositories/users.repository';
import { UsersCreatedEvent } from '../events/created/users-created.event';
import * as bcrypt from 'bcryptjs';
import { ObjectId } from "mongodb";
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class UserFactory implements EntityFactory<User> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async save(
    id: string | null,
    nickName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string,
    gender: string,
    accountType: string,
    region: string,
    city: string,
    address: string,
    identityType: string,
    identityNo: string,
    residenceNo: string,
    dateOfBirth: Date,
  ): Promise<User> {
    const isInsert = id === null;

    const salt =
      await bcrypt
        .genSalt();

    const hashedPassword =
      await bcrypt
        .hash(
          password,
          salt,
        );

    if (isInsert) {
      const entity =
        User
          .create(
            createObjectIdAsString(
              id,
            ),
            nickName,
            email,
            phoneNumber,
            hashedPassword,
            role,
            gender,
            accountType,
            region,
            city,
            address,
            identityType,
            identityNo,
            residenceNo,
            dateOfBirth,
          );

      await this
        .usersRepository
        .insert(
          entity,
        );

      entity
        .apply(
          new UsersCreatedEvent(
            entity._id,
          ),
        );

      return entity;
    }


    const foundEntity =
      await this
        .usersRepository
        .getById(
          id
        );

    if (foundEntity == null) {
      return null;
    }

    foundEntity.nickName = nickName;
    foundEntity.phoneNumber = phoneNumber;
    foundEntity.role = role;
    foundEntity.gender = gender;
    foundEntity.accountType = accountType;
    foundEntity.region = region;
    foundEntity.city = city;
    foundEntity.address = address;
    foundEntity.identityType = identityType;
    foundEntity.identityNo = identityNo;
    foundEntity.residenceNo = residenceNo;
    foundEntity.dateOfBirth = dateOfBirth;

    const updatedEntity =
      await this
        .usersRepository
        .getAndUpdate(
          {
            _id:
              createObjectId(
                id,
              ),
          },
          foundEntity,
        );

    return updatedEntity;
  }
}