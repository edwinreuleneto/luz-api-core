// Services
import { Injectable } from '@nestjs/common';
import { Contract, File } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { FileEntity } from '../files/entities/file.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { LinkContractDto } from './dto/link-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractEntity } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  private transform(
    contract: Contract & { file?: File | null },
  ): ContractEntity {
    return {
      ...contract,
      clientId: contract.clientId ?? undefined,
      fileId: contract.fileId ?? undefined,
      file: contract.file
        ? (contract.file as unknown as FileEntity)
        : undefined,
    } as ContractEntity;
  }

  async create(dto: CreateContractDto): Promise<ContractEntity> {
    const contract = await this.prisma.client.contract.create({ data: dto });
    return this.transform(contract);
  }

  async linkToClient(dto: LinkContractDto): Promise<ContractEntity> {
    const contract = await this.prisma.client.contract.create({
      data: {
        title: dto.title,
        fileId: dto.fileId,
        clientId: dto.clientId,
      },
    });

    return this.transform(contract);
  }

  async findAllByUser(userId: string): Promise<ContractEntity[]> {
    const contracts = await this.prisma.client.contract.findMany({
      where: { responsibleUsers: { some: { userId } } },
      include: { file: true },
      orderBy: { createdAt: 'desc' },
    });

    return contracts.map((contract) => this.transform(contract));
  }

  async findOne(id: string): Promise<ContractEntity> {
    const contract = await this.prisma.client.contract.findUniqueOrThrow({
      where: { id },
    });
    return this.transform(contract);
  }

  async update(id: string, dto: UpdateContractDto): Promise<ContractEntity> {
    const contract = await this.prisma.client.contract.update({
      where: { id },
      data: dto,
    });
    return this.transform(contract);
  }

  async setFile(id: string, fileId: string) {
    return this.prisma.client.contract.update({
      where: { id },
      data: { fileId },
      select: { id: true, fileId: true },
    });
  }

  async addResponsible(contractId: string, userId: string) {
    return this.prisma.client.contractResponsible.upsert({
      where: { contractId_userId: { contractId, userId } },
      update: {},
      create: { contractId, userId },
      select: { contractId: true, userId: true },
    });
  }
}
