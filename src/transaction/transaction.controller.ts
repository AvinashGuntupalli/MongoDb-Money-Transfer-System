import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get transaction history by phone numbers' })
  @ApiQuery({ name: 'senderPhone', required: false, type: String })
  @ApiQuery({ name: 'receiverPhone', required: false, type: String })
  async getTransactions(
    @Query('senderPhone') senderPhone?: string,
    @Query('receiverPhone') receiverPhone?: string,
  ) {
    return this.transactionService.getTransactions({
      senderPhone,
      receiverPhone,
    });
  }

  @Get('summary/:phone')
  @ApiOperation({
    summary: 'Get total amount sent and received by a phone number',
  })
  getSummary(@Param('phone') phone: string) {
    return this.transactionService.getTransactionSummary(phone);
  }

  @Get('top-senders')
  @ApiOperation({ summary: 'Get top 5 users who sent the most money' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopSenders(@Query('limit') limit = 5) {
    return this.transactionService.getTopSenders(limit);
  }

  @Get('top-receivers')
  @ApiOperation({ summary: 'Get top N receivers by amount received' })
  async getTopReceivers() {
    return this.transactionService.getTopReceivers();
  }

  @Get('daily-summary')
  @ApiOperation({ summary: 'Get daily transaction summary (total & count)' })
  async getDailySummary() {
    return this.transactionService.getDailyTransactionSummary();
  }

  @Get('by-date/:date')
  @ApiOperation({ summary: 'Get all transactions on a specific date' })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2025-05-24',
  })
  @ApiQuery({ name: 'phone', required: false, type: String })
  async getTransactionsByDate(
    @Param('date') date: string,
    @Query('phone') phone?: string,
  ) {
    return this.transactionService.getTransactionsByDate(date, phone);
  }

  @Get('history/:phone')
  @ApiOperation({ summary: 'Paginated transaction history for a phone number' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 5 })
  async getTransactionHistory(
    @Param('phone') phone: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    return this.transactionService.getAllTransactionHistory(
      phone,
      Number(page),
      Number(limit),
    );
  }
}
