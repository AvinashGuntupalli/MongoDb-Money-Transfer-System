import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../wallet/wallet.schema';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    TransactionModule,
  ],
  controllers: [TransferController],
  providers: [TransferService],
  exports: [TransferService],
})
export class TransferModule {}
