// Services
import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientQueryDto } from './dto/client-query.dto';

import { transformClient } from './helper/transform';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto): Promise<ClientEntity> {
    try {
      const client = await this.prisma.client.client.create({ data: dto });
      return transformClient(client);
    } catch (error) {
      this.logger.error(`Error creating client`, (error as Error).stack);
      throw error;
    }
  }

  async findAll(query: ClientQueryDto) {
    try {
      const page = query.page ?? 1;
      const pageSize = query.pageSize ?? 20;
      const where: any = {};
      if (query.search) {
        where.OR = [
          { fullName: { contains: query.search, mode: 'insensitive' } },
          { companyName: { contains: query.search, mode: 'insensitive' } },
        ];
      }
      if (query.personType) {
        where.personType = query.personType;
      }
      const [data, total] = await Promise.all([
        this.prisma.client.client.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.client.client.count({ where }),
      ]);
      return {
        data: data.map((c) => transformClient(c)),
        total,
        page,
        pageSize,
      };
    } catch (error) {
      this.logger.error('Error finding clients', (error as Error).stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<ClientEntity> {
    try {
      const client = await this.prisma.client.client.findUniqueOrThrow({
        where: { id },
      });
      return transformClient(client);
    } catch (error) {
      this.logger.error(`Error finding client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateClientDto): Promise<ClientEntity> {
    try {
      const client = await this.prisma.client.client.update({
        where: { id },
        data: dto,
      });
      return transformClient(client);
    } catch (error) {
      this.logger.error(`Error updating client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async remove(id: string): Promise<ClientEntity> {
    try {
      const client = await this.prisma.client.client.delete({ where: { id } });
      return transformClient(client);
    } catch (error) {
      this.logger.error(`Error removing client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async setLogo(id: string, fileId: string) {
    try {
      return await this.prisma.client.client.update({
        where: { id },
        data: { logoFileId: fileId },
        select: { id: true, logoFileId: true },
      });
    } catch (error) {
      this.logger.error(
        `Error setting logo for client ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async setDoc(id: string, fileId: string) {
    try {
      return await this.prisma.client.client.update({
        where: { id },
        data: { docMainFileId: fileId },
        select: { id: true, docMainFileId: true },
      });
    } catch (error) {
      this.logger.error(
        `Error setting doc for client ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
