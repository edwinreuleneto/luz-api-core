// Controllers
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AttachDto } from './dto/attach.dto';
import { FileLinksService } from './file-links.service';

@ApiTags('file-links')
@Controller('api/v1/file-links')
export class FileLinksController {
  constructor(private readonly fileLinksService: FileLinksService) {}

  @Post('attach')
  attach(@Body() dto: AttachDto) {
    return this.fileLinksService.attach(dto);
  }
}

