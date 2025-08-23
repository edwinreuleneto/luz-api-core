// DTOs
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class UploadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  extension!: string;

  @ApiProperty()
  @IsUrl()
  baseUrl!: string;

  @ApiProperty()
  @IsString()
  folder!: string;

  @ApiProperty()
  @IsString()
  file!: string;

  @ApiProperty()
  @IsUrl()
  url!: string;

  @ApiProperty()
  @IsInt()
  size!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contentType?: string;

  @ApiProperty({ required: false, description: 'ETag retornado pelo S3 no upload (se disponível)' })
  @IsOptional()
  @IsString()
  eTag?: string;
}

