import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private transformPrismaUser(prismaUser: any): UserEntity {
    return {
      ...prismaUser,
      phone: prismaUser.phone ?? undefined,
      cpf: prismaUser.cpf ?? undefined,
      oab: prismaUser.oab ?? undefined,
      profileFileId: prismaUser.profileFileId ?? undefined,
      lastLogin: prismaUser.lastLogin ?? undefined,
      department: prismaUser.department ?? undefined,
      unit: prismaUser.unit ?? undefined,
      supervisorId: prismaUser.supervisorId ?? undefined,
    };
  }

  async create(firebaseUid: string, data: CreateUserDto): Promise<UserEntity> {
    // Extract password from data if it exists (for RegisterEmailDto)
    const { password, ...userData } = data as any;

    const user = await this.prismaService.client.user.create({
      data: {
        firebaseUid,
        ...userData,
      },
    });
    return this.transformPrismaUser(user);
  }

  async findByFirebaseUid(firebaseUid: string): Promise<UserEntity | null> {
    const user = await this.prismaService.client.user.findUnique({
      where: { firebaseUid },
    });
    return user ? this.transformPrismaUser(user) : null;
  }

  async updateLoginInfo(id: string): Promise<UserEntity> {
    const user = await this.prismaService.client.user.update({
      where: { id },
      data: { lastLogin: new Date(), failedAttempts: 0 },
    });
    return this.transformPrismaUser(user);
  }

  async setProfileFile(id: string, fileId: string): Promise<UserEntity> {
    const user = await this.prismaService.client.user.update({
      where: { id },
      data: { profileFileId: fileId },
    });
    return this.transformPrismaUser(user);
  }
}
