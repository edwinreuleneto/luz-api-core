// Controllers
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UploadDto } from '../s3/dto/upload.dto';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('api/v1/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() dto: UploadDto) {
    return this.filesService.createOrUpsert(dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.filesService.get(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}

