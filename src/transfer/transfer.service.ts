import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransferDto } from './dto/transfer.dto';
import { Wallet, WalletDocument } from '../wallet/wallet.schema';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async transfer(dto: TransferDto): Promise<any> {
    const { senderPhone, receiverPhone, amount } = dto;

    console.log(
      `Initiating transfer from ${senderPhone} to ${receiverPhone} of ₹${amount}`,
    );

    const senderWallet = await this.walletModel.findOne({ phone: senderPhone });
    const receiverWallet = await this.walletModel.findOne({
      phone: receiverPhone,
    });

    if (!senderWallet) {
      throw new NotFoundException('Sender wallet not found');
    }

    if (!receiverWallet) {
      throw new NotFoundException('Receiver wallet not found');
    }

    if (senderWallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    return {
      message: 'Transfer successful',
      from: senderWallet.phone,
      to: receiverWallet.phone,
      amount,
    };
  }
}
