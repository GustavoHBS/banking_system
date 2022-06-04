import { ApiProperty } from '@nestjs/swagger';
import { IDepositProps } from 'src/shared/interface/depositProps.interface';

export class DepositDTO implements IDepositProps {
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
