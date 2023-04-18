import { compare } from 'bcryptjs';

export interface Bcryptjs {
  compare(password, currPassword): Promise<boolean>;
}

export class BcryptjsImplementation implements Bcryptjs {
  async compare(password: any, currPassword: any): Promise<boolean> {
    const matchPassowrd = await compare(password, currPassword);
    return matchPassowrd;
  }
}
