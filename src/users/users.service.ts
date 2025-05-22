import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly walletService: WalletService, // inject the service
  ) {}

  // async createUser(dto: CreateUserDto): Promise<User> {
  //   // create the user
  //   const user = await this.userModel.create({
  //     name: dto.name,
  //     phone: dto.phone,
  //   });

  //   // reuse WalletService to create the wallet
  //   await this.walletService.createWallet(
  //     user._id,
  //     dto.phone,
  //     dto.initialBalance,
  //   );

  //   return user;
  // }
  async createUser(dto: CreateUserDto): Promise<User> {
    // Step 1: Create user
    const user = await this.userModel.create({
      name: dto.name,
      phone: dto.phone,
    });

    // Step 2: Automatically create wallet with initial balance
    await this.walletService.createWallet({
      userId: user._id,
      phone: dto.phone,
      initialBalance: dto.initialBalance,
    });

    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userModel.findOne({ phone });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
