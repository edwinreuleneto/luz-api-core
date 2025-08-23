// Controllers
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilesService } from '../files/files.service';
import { PresignDto } from './dto/presign.dto';
import { UploadDto } from './dto/upload.dto';
import { S3Service } from './s3.service';

@ApiTags('s3')
@Controller('api/v1/s3')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    private readonly filesService: FilesService,
  ) {}

  @Post('presign')
  @ApiOperation({ summary: 'Gerar URL pré-assinada (PUT) para S3' })
  async presign(@Body() dto: PresignDto) {
    if (!dto.key || dto.key.includes('..')) {
      throw new BadRequestException('Chave inválida');
    }
    return this.s3Service.presignPut(dto.key, dto.contentType, dto.expiresSeconds);
  }

  @Post('complete-upload')
  @ApiOperation({ summary: 'Persistir metadados do arquivo em File' })
  async complete(@Body() dto: UploadDto) {
    if (!dto.url) {
      dto.url = this.s3Service.buildPublicUrl(dto.file);
    }
    return this.filesService.createOrUpsert(dto);
  }
}

