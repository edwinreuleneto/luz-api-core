// Services
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientQueryDto } from './dto/client-query.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  private transform(prismaClient: any): ClientEntity {
    return {
      ...prismaClient,
      fullName: prismaClient.fullName ?? undefined,
      companyName: prismaClient.companyName ?? undefined,
      cpf: prismaClient.cpf ?? undefined,
      cnpj: prismaClient.cnpj ?? undefined,
      email: prismaClient.email ?? undefined,
      phone: prismaClient.phone ?? undefined,
      website: prismaClient.website ?? undefined,
      notes: prismaClient.notes ?? undefined,
      logoFileId: prismaClient.logoFileId ?? undefined,
      docMainFileId: prismaClient.docMainFileId ?? undefined,
    };
  }

  async create(dto: CreateClientDto): Promise<ClientEntity> {
    const client = await this.prisma.client.client.create({ data: dto });
    return this.transform(client);
  }

  async findAll(query: ClientQueryDto) {
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
      data: data.map((c) => this.transform(c)),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string): Promise<ClientEntity> {
    const client = await this.prisma.client.client.findUniqueOrThrow({
      where: { id },
    });
    return this.transform(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<ClientEntity> {
    const client = await this.prisma.client.client.update({
      where: { id },
      data: dto,
    });
    return this.transform(client);
  }

  async remove(id: string): Promise<ClientEntity> {
    const client = await this.prisma.client.client.delete({ where: { id } });
    return this.transform(client);
  }

  async setLogo(id: string, fileId: string) {
    return this.prisma.client.client.update({
      where: { id },
      data: { logoFileId: fileId },
      select: { id: true, logoFileId: true },
    });
  }

  async setDoc(id: string, fileId: string) {
    return this.prisma.client.client.update({
      where: { id },
      data: { docMainFileId: fileId },
      select: { id: true, docMainFileId: true },
    });
  }
}
