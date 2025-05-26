import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '9876543210',
    description: 'Phone number must be 10 digits',
  })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone must be a valid 10-digit number' })
  phone: string;

  @ApiProperty({
    example: '12345',
    description: 'users password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
