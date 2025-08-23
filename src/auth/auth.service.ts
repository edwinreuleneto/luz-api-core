import { Injectable, UnauthorizedException } from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterEmailDto } from './dto/register-email.dto';
import { RegisterMicrosoftDto } from './dto/register-microsoft.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
  ) {}

  async registerWithEmail(dto: RegisterEmailDto): Promise<UserEntity> {
    const record = (await this.firebaseService.createUser(
      dto.email,
      dto.password,
      dto.fullName,
    )) as { uid: string };
    return this.usersService.create(record.uid, dto);
  }

  async registerWithMicrosoft(dto: RegisterMicrosoftDto): Promise<UserEntity> {
    const decoded = (await this.firebaseService.verifyIdToken(dto.idToken)) as {
      uid: string;
    };
    return this.usersService.create(decoded.uid, dto);
  }

  private async validateToken(idToken: string): Promise<UserEntity> {
    const decoded = (await this.firebaseService.verifyIdToken(idToken)) as {
      uid: string;
    };
    const user = await this.usersService.findByFirebaseUid(decoded.uid);
    if (!user) {
      throw new UnauthorizedException('Usuário não registrado');
    }
    await this.usersService.updateLoginInfo(user.id);
    return user;
  }

  async loginWithMicrosoft(dto: LoginDto): Promise<UserEntity> {
    return this.validateToken(dto.idToken);
  }

  async loginWithEmail(dto: LoginDto): Promise<UserEntity> {
    return this.validateToken(dto.idToken);
  }
}
