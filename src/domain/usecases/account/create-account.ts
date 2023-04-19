import { DeepPartial } from 'typeorm';
import { AccountModel } from '../../models/account';

export interface AddAcountModel {
  name: string;
  email: string;
  password: string;
  permission: string;
  company_id?: number;
}

export interface AddAcount {
  add(account: AddAcountModel): Promise<DeepPartial<AccountModel>>;
}
