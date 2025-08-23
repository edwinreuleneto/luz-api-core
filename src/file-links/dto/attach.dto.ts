// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum FileOwnerType {
  CASE = 'CASE',
  CONTRACT = 'CONTRACT',
  CLIENT = 'CLIENT',
  INVOICE = 'INVOICE',
  MISC = 'MISC',
}

export class AttachDto {
  @ApiProperty()
  @IsUUID()
  fileId!: string;

  @ApiProperty({ enum: FileOwnerType })
  @IsEnum(FileOwnerType)
  ownerType!: FileOwnerType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contractId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  invoiceId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  documentType?: string;
}

