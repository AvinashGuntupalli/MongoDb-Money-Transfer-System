import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
  senderWalletId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
  receiverWalletId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
