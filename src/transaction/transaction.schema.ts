import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  senderPhone: string;

  @Prop({ required: true })
  receiverPhone: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['SUCCESS', 'FAILED'] })
  status: string;

  @Prop()
  message?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
