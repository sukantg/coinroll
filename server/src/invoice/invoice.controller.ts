import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { Invoice, InvoiceStatus } from './schemas/invoice.schema';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async create(@Body() createInvoiceDto: Partial<Invoice>): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'Return all invoices' })
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by id' })
  @ApiResponse({ status: 200, description: 'Return the invoice' })
  async findOne(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update invoice status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: InvoiceStatus,
  ): Promise<Invoice> {
    return this.invoiceService.updateStatus(id, status);
  }

  @Put(':id/proof')
  @ApiOperation({ summary: 'Add proof to invoice' })
  @ApiResponse({ status: 200, description: 'Proof added successfully' })
  async addProof(
    @Param('id') id: string,
    @Body('merkleProof') merkleProof: string,
    @Body('zkProof') zkProof: string,
  ): Promise<Invoice> {
    return this.invoiceService.addProof(id, merkleProof, zkProof);
  }
} 