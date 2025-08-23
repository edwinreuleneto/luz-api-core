// Modules
import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [FilesModule],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}

