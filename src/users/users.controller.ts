import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.schema';
import { Roles } from '../rolesGuard/roles.decorator';
import { Role } from '../rolesGuard/role.enum';
import { RolesGuard } from '../rolesGuard/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin) // Only allow admins
  // @ApiBearerAuth('JWT-auth')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user with wallet(Admin Only)' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or duplicate phone',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('phone/:phone')
  @ApiOperation({ summary: 'Find user by phone number' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone);
  }

  @Get('getAllUsers')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }
}
