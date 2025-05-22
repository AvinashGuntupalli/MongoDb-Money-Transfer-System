import { IsString, IsNumber, Matches, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({
    example: '663f85f537bc9b7d3c2a6f9a',
    description: 'MongoDB ObjectId of the user',
  })
  @IsString({ message: 'User ID must be a string' })
  userId: string;

  @ApiProperty({
    example: '9876543210',
    description: 'User phone number (10-digit format)',
  })
  @IsString({ message: 'Phone must be a string' })
  @Matches(/^\d{10}$/, { message: 'Phone must be a valid 10-digit number' })
  phone: string;

  @ApiProperty({
    example: 500,
    description: 'Initial wallet balance (must be >= 0)',
  })
  @IsNumber({}, { message: 'Initial balance must be a number' })
  @Min(0, { message: 'Initial balance must be at least 0' })
  initialBalance: number;
}
