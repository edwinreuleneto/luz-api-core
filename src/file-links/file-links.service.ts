// Services
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AttachDto } from './dto/attach.dto';

@Injectable()
export class FileLinksService {
  constructor(private readonly prisma: PrismaService) {}

  attach(dto: AttachDto) {
    return (this.prisma.client as any).fileLink.create({ data: dto });
  }
}

