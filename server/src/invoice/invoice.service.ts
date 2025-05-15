import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument, InvoiceStatus } from './schemas/invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async create(createInvoiceDto: Partial<Invoice>): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }

  async findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id).exec();
  }

  async update(id: string, updateInvoiceDto: Partial<Invoice>): Promise<Invoice> {
    return this.invoiceModel
      .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
      .exec();
  }

  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    return this.invoiceModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async addProof(id: string, merkleProof: string, zkProof: string): Promise<Invoice> {
    return this.invoiceModel
      .findByIdAndUpdate(
        id,
        { merkleProof, zkProof, status: InvoiceStatus.VERIFIED },
        { new: true },
      )
      .exec();
  }
} 