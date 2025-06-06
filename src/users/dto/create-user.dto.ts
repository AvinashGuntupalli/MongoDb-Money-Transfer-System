import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Min,
  Matches,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Alice',
    description: 'Full name of the user',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Phone number must be 10 digits',
  })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone must be a valid 10-digit number' })
  phone: string;

  @ApiProperty({
    example: 500,
    description: 'Initial balance to set up wallet (must be ≥ 0)',
  })
  @IsNumber({}, { message: 'Initial balance must be a number' })
  @Min(0, { message: 'Initial balance must be at least 0' })
  initialBalance: number;

  @ApiProperty({
    example: '12345',
    description: 'users password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role must be either user or admin',
    enum: ['user', 'admin'],
    default: 'user',
    example: 'admin',
  })
  @IsEnum(['user', 'admin'])
  role: 'user' | 'admin';
}
