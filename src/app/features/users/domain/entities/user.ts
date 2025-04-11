/** @format */

import { AggregateRoot } from "@nestjs/cqrs";
import { ObjectId } from "mongodb";
import { createObjectIdAsString } from "src/app/@core/utils/functions/mongo-functions";

export class User extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public nickName: string,
    public readonly email: string,
    public phoneNumber: string,
    public isEmailConfirmed: boolean,
    public readonly isPhoneNumberConfirmed: boolean,
    public password: string,
    public role: string,
    public gender?: string,
    public accountType?: string,
    public region?: string,
    public city?: string,
    public address?: string,
    public identityType?: string,
    public identityNo?: string,
    public residenceNo?: string,
    public dateOfBirth?: Date,
    public isVerified: boolean = false,
    public readonly displayOrder: number = 0,
    public readonly isVisible: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string,
    public readonly deletedBy?: string
  ) {
    super();
  }

  public static create(
    id: string | null,
    nickName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string,
    gender: string = null,
    accountType: string = null,
    region: string = null,
    city: string = null,
    address: string = null,
    identityType: string = null,
    identityNo: string = null,
    residenceNo: string = null,
    dateOfBirth: Date = null,
    isVerified: boolean = false,
    displayOrder: number = 0,
    isVisible: boolean = true,
    createdAt: Date = null,
    updatedAt: Date = null,
    deletedAt: Date = null,
    createdBy: string = null,
    updatedBy: string = null,
    deletedBy: string = null
  ): User {
    return new User(
      createObjectIdAsString(id),
      nickName,
      email,
      phoneNumber,
      false,
      false,
      password,
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
      isVerified,
      displayOrder,
      isVisible,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy
    );
  }
}
