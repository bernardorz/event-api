import { auth } from '../../models/authentication';

export interface AuthModel {
  email: string;
  password: string;
}

export interface Authentication {
  auth(account: AuthModel): Promise<auth>;
}
