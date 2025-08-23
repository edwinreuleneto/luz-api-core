// Modules
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { FileLinksController } from './file-links.controller';
import { FileLinksService } from './file-links.service';

@Module({
  imports: [PrismaModule],
  controllers: [FileLinksController],
  providers: [FileLinksService],
  exports: [FileLinksService],
})
export class FileLinksModule {}

