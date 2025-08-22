import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterEmailDto } from './dto/register-email.dto';
import { RegisterMicrosoftDto } from './dto/register-microsoft.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  @ApiOperation({ summary: 'Cadastro via email e senha' })
  async registerEmail(@Body() dto: RegisterEmailDto): Promise<UserEntity> {
    return this.authService.registerWithEmail(dto);
  }

  @Post('register/microsoft')
  @ApiOperation({ summary: 'Cadastro via Microsoft' })
  async registerMicrosoft(@Body() dto: RegisterMicrosoftDto): Promise<UserEntity> {
    return this.authService.registerWithMicrosoft(dto);
  }

  @Post('login/microsoft')
  @ApiOperation({ summary: 'Login com Microsoft' })
  async loginMicrosoft(@Body() dto: LoginDto): Promise<UserEntity> {
    return this.authService.loginWithMicrosoft(dto);
  }

  @Post('login/email')
  @ApiOperation({ summary: 'Login com email e senha' })
  async loginEmail(@Body() dto: LoginDto): Promise<UserEntity> {
    return this.authService.loginWithEmail(dto);
  }
}
