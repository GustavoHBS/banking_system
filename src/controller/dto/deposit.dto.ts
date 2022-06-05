import { ApiProperty } from '@nestjs/swagger';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';

export class DepositDTO implements IAccountAndValue {
  @ApiProperty({
    type: Number,
    required: true,
  })
  accountId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  value: number;
}
