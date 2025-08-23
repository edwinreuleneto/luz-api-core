import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { SetFileDto } from '../files/dto/set-file.dto';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':firebaseUid')
  @ApiOperation({ summary: 'Busca usuário pelo Firebase UID' })
  @ApiParam({ name: 'firebaseUid', type: String })
  async findByFirebaseUid(
    @Param('firebaseUid') firebaseUid: string,
  ): Promise<UserEntity | null> {
    return this.usersService.findByFirebaseUid(firebaseUid);
  }

  @Patch(':id/profile-file')
  @ApiOperation({ summary: 'Definir imagem de perfil (fileId) do usuário' })
  async setProfileFile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    return this.usersService.setProfileFile(id, dto.fileId);
  }
}
