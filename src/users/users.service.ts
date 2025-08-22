import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(firebaseUid: string, data: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.client.user.create({
      data: {
        firebaseUid,
        ...data,
      },
    });
  }

  async findByFirebaseUid(firebaseUid: string): Promise<UserEntity | null> {
    return this.prismaService.client.user.findUnique({ where: { firebaseUid } });
  }

  async updateLoginInfo(id: string): Promise<UserEntity> {
    return this.prismaService.client.user.update({
      where: { id },
      data: { lastLogin: new Date(), failedAttempts: 0 },
    });
  }
}
