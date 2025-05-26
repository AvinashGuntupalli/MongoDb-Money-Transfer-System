import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { WalletModule } from '../wallet/wallet.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../rolesGuard/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    WalletModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
