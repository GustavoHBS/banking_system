import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';

export class DepositDTO implements IAccountAndValue {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  accountId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
