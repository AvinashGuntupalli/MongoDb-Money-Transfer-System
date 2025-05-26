// import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { WalletService } from '../wallet/wallet.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private walletService: WalletService,
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ phone });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { sub: user._id, phone: user.phone, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: {
    name: string;
    phone: string;
    password: string;
    role?: string;
  }) {
    const existingUser = await this.userModel.findOne({ phone: data.phone });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.userModel.create({
      ...data,
      password: hashedPassword,
      role: data.role ?? 'user',
    });

    // Automatically create wallet after registration
    await this.walletService.createWallet({
      userId: newUser._id,
      phone: newUser.phone,
      initialBalance: 1000, // or get from DTO if needed
    });

    return newUser;
  }
}
