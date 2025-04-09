import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { UserCompaniesRepository } from '../../persistence/repositories/user-companies.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly userCompaniesRepository: UserCompaniesRepository,
  ) {}

  async addUserToCompany(userId: ObjectId, companyId: ObjectId, role: string) {
    return this.userCompaniesRepository.createUserCompany(userId, companyId, role);
  }
}