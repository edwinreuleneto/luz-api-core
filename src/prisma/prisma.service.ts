import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;

  async onModuleInit(): Promise<void> {
    this.prismaClient = new PrismaClient();
    await this.prismaClient.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  get client() {
    return this.prismaClient;
  }
}
