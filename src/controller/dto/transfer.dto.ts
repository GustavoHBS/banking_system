import { ApiProperty } from '@nestjs/swagger';
import { ITransfer } from 'src/shared/interface/transfer.interface';

export class TransferDTO implements ITransfer {
  @ApiProperty({
    type: Number,
    required: true,
  })
  senderId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  receiverId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  value: number;
}
