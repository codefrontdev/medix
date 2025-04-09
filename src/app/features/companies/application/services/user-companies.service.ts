import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserCompaniesSchema } from '../../persistence/schemas/user-company.schema';
import { CompaniesGetAllUsersResponse } from '../../presentation/contracts/response/companies-get-all-users.response';

@Injectable()
export class UserCompaniesService {
    constructor(
        @InjectModel(UserCompaniesSchema.name) private userCompaniesModel: Model<UserCompaniesSchema>
    ) {}

    async getAllUsersByCompanyId(companyId: string): Promise<CompaniesGetAllUsersResponse[]> {
        const userCompanies = await this.userCompaniesModel.find({  companyId: new Types.ObjectId(companyId) })
        .populate('userId') // Populate userId to get user details
        .exec();
        //console.log(userCompanies)
        return userCompanies.map(userCompany => {
            const user = userCompany.userId as any; // This should now be the populated user object
           
            return CompaniesGetAllUsersResponse.create(
                user._id.toString(),
                user.nickName,
                user.email,
                userCompany.Role,
            );
        });
    }
}
