import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { IStatement } from 'src/shared/interface/statement.interface';

export class GetStatementResponseDTO implements IStatement {
  @ApiProperty({
    enum: [TransactionType],
  })
  type: TransactionType;

  @ApiProperty({
    type: Number,
  })
  value: number;

  @ApiProperty({
    type: Date,
  })
  date: Date;
}
