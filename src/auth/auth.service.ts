import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { FirebaseService } from '../firebase/firebase.service';
import { UsersService } from '../users/users.service';
import { RegisterEmailDto } from './dto/register-email.dto';
import { RegisterMicrosoftDto } from './dto/register-microsoft.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
  ) {}

  async registerWithEmail(dto: RegisterEmailDto): Promise<User> {
    const record = await this.firebaseService.createUser(dto.email, dto.password, dto.fullName);
    return this.usersService.create(record.uid, dto);
  }

  async registerWithMicrosoft(dto: RegisterMicrosoftDto): Promise<User> {
    const decoded = await this.firebaseService.verifyIdToken(dto.idToken);
    return this.usersService.create(decoded.uid, dto);
  }

  private async validateToken(idToken: string): Promise<User> {
    const decoded = await this.firebaseService.verifyIdToken(idToken);
    const user = await this.usersService.findByFirebaseUid(decoded.uid);
    if (!user) {
      throw new UnauthorizedException('Usuário não registrado');
    }
    await this.usersService.updateLoginInfo(user.id);
    return user;
  }

  async loginWithMicrosoft(dto: LoginDto): Promise<User> {
    return this.validateToken(dto.idToken);
  }

  async loginWithEmail(dto: LoginDto): Promise<User> {
    return this.validateToken(dto.idToken);
  }
}
