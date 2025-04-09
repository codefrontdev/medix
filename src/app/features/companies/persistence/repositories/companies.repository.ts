import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/app/@core/shared/persistence/repositories/base.repository";
import { CompanySchema } from "../schemas/company.schema";
import { Company } from "../../domain/entities/company";
import { CompanySchemaFactory } from "../factories/company-schema.factory";
import { ObjectId } from 'mongodb';

@Injectable()
export class CompaniesRepository
  extends BaseRepository<CompanySchema, Company> {
  public constructor(
    @InjectModel(CompanySchema.name)
    public readonly model: Model<CompanySchema>,
    public readonly schemaFactory: CompanySchemaFactory,
  ) {
    super(
      model,
      schemaFactory,
    );
  }
  public async updateItemNr(companyId: string, itemNr: number): Promise<void> {
    // Implement the logic to update the company's itemNr
    const company = await this.getById(companyId);
    if (company) {
      company.itemNr = itemNr;
      console.log('company', company);
      await this.getAndUpdate({ _id: new ObjectId(companyId) }, company);
    }
  }
  public async updateTenderNr(companyId: string, TenderNr: number): Promise<void> {
    // Implement the logic to update the company's itemNr
    const company = await this.getById(companyId);
    if (company) {
      company.TenderNr = TenderNr;      
      console.log('company', company);
      await this.getAndUpdate({ _id: new ObjectId(companyId) }, company);
    }
  }
  public async updateOpportunityNr(companyId: string, OpportunityNr: number): Promise<void> {
    // Implement the logic to update the company's itemNr
    const company = await this.getById(companyId);
    if (company) {
      company.OpportunityNr = OpportunityNr;      
      console.log('company', company);
      await this.getAndUpdate({ _id: new ObjectId(companyId) }, company);
    }
  }
  public async updateOrderNr(companyId: string, OrderNr: number): Promise<void> {
    // Implement the logic to update the company's itemNr
    const company = await this.getById(companyId);
    if (company) {
      company.orderNr = OrderNr;      
      console.log('company', company);
      await this.getAndUpdate({ _id: new ObjectId(companyId) }, company);
    }
  }
  public async getByRegistrationNumber(
    registrationNumber: string
  ): Promise<Company | null> {
    const entity =
      await this
        .get(
          {
            registrationNumber: registrationNumber
          },
        )

    return entity;
  }
  public async getByCompanyNr(companyNr: string): Promise<Company | null> {
    return this.getByCompanyNr(companyNr);
  }
  public async getCompanyByUserId(
    userId: string
  ): Promise<Company | null> {
    const entity =
      await this
        .get(
          {
            userId: new ObjectId(userId)
          },
        )

    return entity;
  }
  
}