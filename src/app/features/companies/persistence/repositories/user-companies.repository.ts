import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserCompaniesSchema } from '../schemas/user-company.schema';

const createObjectId = (id?: string): ObjectId => {
    return id ? new ObjectId(id) : new ObjectId(); 
};
@Injectable()
export class UserCompaniesRepository {
  constructor(
    @InjectModel(UserCompaniesSchema.name)
    private readonly userCompaniesModel: Model<UserCompaniesSchema>,
  ) {}

  async createUserCompany(userId: ObjectId, companyId: ObjectId, role: string) {
    const existingUserCompany = await this.userCompaniesModel.findOne({
        userId,
        companyId,
      });
  
      if (existingUserCompany) {
        // If the user already has a company association, throw a conflict exception
        return true
      }
  
      // If no existing association, create a new one
      const newUserCompany = new this.userCompaniesModel({
        _id: createObjectId(), // Generate a new ObjectId for the _id field
        userId,
        companyId,
        Role: role, // Ensure you are using the correct property name (case-sensitive)
      });
    return await newUserCompany.save();
  }
}
