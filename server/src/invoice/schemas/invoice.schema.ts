import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  VERIFIED = 'VERIFIED',
}

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @Prop()
  merkleProof?: string;

  @Prop()
  zkProof?: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice); 