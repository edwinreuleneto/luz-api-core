// Controllers
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilesService } from '../files/files.service';
import { FilesUploadService } from '../files/files-upload.service';
import { PresignDto } from './dto/presign.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UploadDto } from './dto/upload.dto';
import { S3Service } from './s3.service';

@ApiTags('s3')
@Controller('api/v1/s3')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    private readonly filesService: FilesService,
    private readonly filesUploadService: FilesUploadService,
  ) {}

  @Post('presign')
  @ApiOperation({ summary: 'Gerar URL pré-assinada (PUT) para S3' })
  async presign(@Body() dto: PresignDto) {
    if (!dto.key || dto.key.includes('..')) {
      throw new BadRequestException('Chave inválida');
    }
    return this.s3Service.presignPut(
      dto.key,
      dto.contentType,
      dto.expiresSeconds,
    );
  }

  @Post('complete-upload')
  @ApiOperation({ summary: 'Persistir metadados do arquivo em File' })
  async complete(@Body() dto: UploadDto) {
    if (!dto.url) {
      dto.url = this.s3Service.buildPublicUrl(dto.file);
    }
    return this.filesService.createOrUpsert(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload de documento para o S3 salvando metadados em File',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        folder: { type: 'string', example: 'contracts', nullable: true },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo é obrigatório');
    }
    const folder = dto.folder ?? 'public';
    return this.filesUploadService.upload(file, folder);
  }
}
