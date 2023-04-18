import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account';

export class AccountDataTransferObject {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Bernardo' })
  name: string;

  @ApiProperty({ example: '13/05/2004' })
  createdAt: Date;

  constructor(partial: Partial<AccountModel>) {
    Object.assign(this, partial);
  }
}
