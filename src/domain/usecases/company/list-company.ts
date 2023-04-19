import { DeepPartial } from 'typeorm';
import { CompanyModel } from '../../models/company';

export interface ListCompanyData {
  page: number;
  limit: number;
  name?: string;
  state?: string;
  tradingName?: string;
  zipcode?: string;
}

export interface ListCompaniesataReturns {
  companies: DeepPartial<CompanyModel>[];
  count: number;
}

export interface ListCompany {
  list(event: ListCompanyData): Promise<ListCompaniesataReturns>;
}
