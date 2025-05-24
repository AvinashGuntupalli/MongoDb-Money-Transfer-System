import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async createWallet(dto: CreateWalletDto): Promise<Wallet> {
    const wallet = new this.walletModel({
      userId: dto.userId,
      phone: dto.phone,
      balance: dto.initialBalance,
    });
    return wallet.save();
  }

  async getWalletByUserId(userId: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ userId }).exec();
  }

  async updateBalance(userId: string, amount: number): Promise<Wallet | null> {
    return this.walletModel.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true },
    );
  }
}
