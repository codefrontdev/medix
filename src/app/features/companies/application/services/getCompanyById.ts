import { Injectable } from "@nestjs/common";
import { Company } from "../../domain/entities/company";
import { CompaniesRepository } from "../../persistence/repositories/companies.repository";

@Injectable()
export class CompanyService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  /**
   * Fetch a company by its ID.
   * @param companyId - The ID of the company to fetch.
   * @returns A promise that resolves to the company object or null.
   */
  async getCompanyById(companyId: string): Promise<Company | null> {
    return this.companiesRepository.getById( companyId );
  }
}
