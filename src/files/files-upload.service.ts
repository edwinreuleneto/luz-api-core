// Services
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Express } from 'express';
import { parse } from 'path';

import { S3Service } from '../s3/s3.service';
import { UploadDto } from '../s3/dto/upload.dto';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';

function isMulterFile(file: unknown): file is Express.Multer.File {
  return (
    typeof file === 'object' &&
    file !== null &&
    'originalname' in file &&
    'mimetype' in file &&
    'size' in file &&
    'buffer' in file
  );
}

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly filesService: FilesService,
  ) {}

  async upload(file: unknown, folder = 'public'): Promise<FileEntity> {
    if (!isMulterFile(file)) {
      throw new BadRequestException('Arquivo é obrigatório');
    }
    const multerFile: Express.Multer.File = file;
    const cleanedFolder =
      (folder || 'public').replace(/^\/+|\/+$/g, '').trim() || 'public';
    if (cleanedFolder.includes('..')) {
      throw new BadRequestException('Pasta inválida');
    }
    const { key, url, eTag } = await this.s3Service.uploadDocument(
      multerFile,
      cleanedFolder,
    );
    const baseUrl = url.replace(`/${key}`, '').replace(/\/$/, '');
    const { name: baseName, ext } = parse(multerFile.originalname);
    const dto: UploadDto = {
      name: baseName,
      extension: ext.replace(/^\./, ''),
      baseUrl,
      folder: cleanedFolder,
      file: key,
      url,
      size: multerFile.size,
      contentType: multerFile.mimetype,
      eTag: eTag ?? undefined,
    };
    return this.filesService.createOrUpsert(dto);
  }
}
