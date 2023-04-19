import { CompanyModel } from 'src/domain/models/company';

export interface AddCompanyModel {
  name: string;
  tradingName: string;
  document: string;
  phone: string;
  state: string;
  zipcode: string;
}

export interface AddCompany {
  add(account: AddCompanyModel): Promise<CompanyModel>;
}
