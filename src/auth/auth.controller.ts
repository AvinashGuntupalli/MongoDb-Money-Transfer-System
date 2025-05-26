import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decarator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.phone, body.password);
    return this.authService.login(user);
  }
}
