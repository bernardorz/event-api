import { DeepPartial } from 'typeorm';
import { AccountModel } from '../../models/account';

export interface ListAccountData {
  page: number;
  limit: number;
  email: string;
  name: string;
}

export interface ListAccountsReturns {
  accounts: DeepPartial<AccountModel>[];
  count: number;
}

export interface ListAccount {
  list(event: ListAccountData): Promise<ListAccountsReturns>;
}
