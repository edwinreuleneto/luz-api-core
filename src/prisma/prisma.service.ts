import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: any;

  async onModuleInit(): Promise<void> {
    const prismaPackage: any = require('@prisma/client');
    const PrismaClient = prismaPackage?.PrismaClient;
    this.prismaClient = new PrismaClient();
    if (this.prismaClient?.$connect) {
      await this.prismaClient.$connect();
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.prismaClient?.$disconnect) {
      await this.prismaClient.$disconnect();
    }
  }

  get client() {
    return this.prismaClient;
  }
}
