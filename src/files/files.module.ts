// Modules
import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/s3.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesUploadService } from './files-upload.service';

@Module({
  imports: [PrismaModule, forwardRef(() => S3Module)],
  controllers: [FilesController],
  providers: [FilesService, FilesUploadService],
  exports: [FilesService, FilesUploadService],
})
export class FilesModule {}
