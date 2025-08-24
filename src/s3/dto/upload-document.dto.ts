// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({
    required: false,
    description: 'Nome da pasta destino no S3. Padrão: public',
  })
  @IsOptional()
  @IsString()
  folder?: string;
}
