import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDto {
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
