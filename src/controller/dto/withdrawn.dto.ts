import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';

export class WithdrawnDTO implements IAccountAndValue {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
