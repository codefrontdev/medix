import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { User } from 'src/app/features/users/domain/entities/user';
import { UsersRepository } from 'src/app/features/users/persistence/repositories/users.repository';

@Injectable()
export class AuthFactory implements EntityFactory<User> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async save(
    id: string | null,
    nickName: string,
    email: string,
    phoneNumber: string,
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