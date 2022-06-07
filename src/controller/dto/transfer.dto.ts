import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ITransfer } from 'src/shared/interface/transfer.interface';

export class TransferDTO implements ITransfer {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  receiverId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
