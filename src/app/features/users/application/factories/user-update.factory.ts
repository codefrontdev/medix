import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { UsersRepository } from '../../persistence/repositories/users.repository';
import { UsersCreatedEvent } from '../events/created/users-created.event';
import * as bcrypt from 'bcryptjs';
import { ObjectId } from "mongodb";
import { GenderEnum } from 'src/app/@core/values/enums/gender.enum';
import { createObjectId } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class UserUpdateFactory implements EntityFactory<User> {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  public async save(
    id: string | null,
    nickName: string,
    phoneNumber: string,
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
    const foundEntity = await this.usersRepository.getById(id);

    if (!foundEntity) {
      return null;
    }

    foundEntity.nickName = nickName;
    foundEntity.phoneNumber = phoneNumber;
    foundEntity.gender = gender;
    foundEntity.accountType = accountType;
    foundEntity.region = region;
    foundEntity.city = city;
    foundEntity.address = address;

    if (!foundEntity.isVerified) {
      foundEntity.identityType = identityType;
      foundEntity.identityNo = identityNo;
      foundEntity.residenceNo = residenceNo;
    }

    foundEntity.dateOfBirth = dateOfBirth;

    const updatedEntity = await this.usersRepository.getAndUpdate(
      { _id: createObjectId(id) },
      foundEntity,
    );

    return updatedEntity;
  }
}
