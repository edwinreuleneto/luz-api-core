// Services
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UploadDto } from '../s3/dto/upload.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpsert(dto: UploadDto): Promise<FileEntity> {
    const data: any = {
      id: dto.id,
      name: dto.name,
      extension: dto.extension,
      baseUrl: dto.baseUrl,
      folder: dto.folder,
      file: dto.file,
      url: dto.url,
      size: dto.size,
      contentType: dto.contentType,
      eTag: dto.eTag,
    };

    const existing = await this.prisma.client.file.findUnique({
      where: { url: dto.url },
    });
    if (existing) return existing as unknown as FileEntity;

    if (dto.id) {
      return (await this.prisma.client.file.create({
        data,
      })) as unknown as FileEntity;
    }

    const { id, ...withoutId } = data;
    return (await this.prisma.client.file.create({
      data: withoutId,
    })) as unknown as FileEntity;
  }

  async get(id: string): Promise<FileEntity> {
    return (await this.prisma.client.file.findUniqueOrThrow({
      where: { id },
    })) as unknown as FileEntity;
  }

  async remove(id: string): Promise<FileEntity> {
    return (await this.prisma.client.file.delete({
      where: { id },
    })) as unknown as FileEntity;
  }
}
