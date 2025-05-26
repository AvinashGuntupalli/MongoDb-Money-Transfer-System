import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { WalletService } from '../wallet/wallet.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly walletService: WalletService, // inject the service
  ) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ phone: dto.phone });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      name: dto.name,
      phone: dto.phone,
      password: hashedPassword,
      role: dto.role || 'user', // use role from dto
    });

    // Automatically create wallet
    await this.walletService.createWallet({
      userId: user._id,
      phone: dto.phone,
      initialBalance: dto.initialBalance ?? 1000, // fallback default
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
