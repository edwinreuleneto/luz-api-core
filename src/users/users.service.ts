import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(firebaseUid: string, data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        firebaseUid,
        ...data,
      },
    });
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { firebaseUid } });
  }

  async updateLoginInfo(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { lastLogin: new Date(), failedAttempts: 0 },
    });
  }
}
