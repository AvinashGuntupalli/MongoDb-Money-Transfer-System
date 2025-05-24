import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { TransferModule } from './transfer/transfer.module';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    WalletModule,
    TransferModule,
    TransactionModule,
  ],
})
export class AppModule {}
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log(encodeURIComponent('your-actual-password'));
