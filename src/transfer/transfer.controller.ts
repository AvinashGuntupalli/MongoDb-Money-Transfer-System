import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './dto/transfer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Transfer money between two wallets' })
  async transfer(@Body() dto: TransferDto) {
    return this.transferService.transfer(dto);
  }
}
