import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
