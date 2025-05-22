import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class TransferDto {
  @ApiProperty({ example: '123456', description: 'Sender phone number' })
  @IsString()
  senderPhone: string;

  @ApiProperty({ example: '654321', description: 'Receiver phone number' })
  @IsString()
  receiverPhone: string;

  @ApiProperty({ example: 100, description: 'Amount to transfer' })
  @IsNumber()
  @Min(1)
  amount: number;
}
