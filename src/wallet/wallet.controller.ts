import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { AuthGuard } from '@nestjs/passport';
import { User as GetUser } from '../common/decorators/user.decorator';

@ApiTags('wallet')
@Controller('wallet')
@ApiBearerAuth() //  By this to let Swagger know this endpoint requires JWT
@UseGuards(AuthGuard('jwt')) // Protect all routes in this controller
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('createWallet')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create wallet manually (not recommended for regular use)',
  })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get wallet by userId' })
  getWallet(@Param('userId') userId: string) {
    return this.walletService.getWalletByUserId(userId);
  }

  @Get('me')
  @ApiOperation({ summary: "Get logged-in user's wallet" })
  getMyWallet(@GetUser() user: any) {
    return this.walletService.getWalletByUserId(user.userId);
  }
}
