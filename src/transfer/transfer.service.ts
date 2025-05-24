import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service'; // Import
import { TransferDto } from './dto/transfer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from '../wallet/wallet.schema';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    private readonly transactionService: TransactionService, // Inject
  ) {}

  async transfer(dto: TransferDto): Promise<any> {
    const { senderPhone, receiverPhone, amount } = dto;

    const senderWallet = await this.walletModel.findOne({ phone: senderPhone });
    const receiverWallet = await this.walletModel.findOne({
      phone: receiverPhone,
    });

    if (!senderWallet || !receiverWallet) {
      await this.transactionService.logTransaction({
        senderPhone,
        receiverPhone,
        amount,
        status: 'FAILED',
        message: 'Sender or Receiver wallet not found',
      });
      throw new NotFoundException('Sender or Receiver wallet not found');
    }

    if (senderWallet.balance < amount) {
      await this.transactionService.logTransaction({
        senderPhone,
        receiverPhone,
        amount,
        status: 'FAILED',
        message: 'Insufficient balance',
      });
      throw new BadRequestException('Insufficient balance');
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    // Log success transaction
    await this.transactionService.logTransaction({
      senderPhone,
      receiverPhone,
      amount,
      status: 'SUCCESS',
    });

    return {
      message: 'Transfer successful',
      from: senderWallet.phone,
      to: receiverWallet.phone,
      amount,
    };
  }
}
