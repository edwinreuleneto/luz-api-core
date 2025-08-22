import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':firebaseUid')
  @ApiOperation({ summary: 'Busca usuário pelo Firebase UID' })
  @ApiParam({ name: 'firebaseUid', type: String })
  async findByFirebaseUid(@Param('firebaseUid') firebaseUid: string): Promise<UserEntity | null> {
    return this.usersService.findByFirebaseUid(firebaseUid);
  }
}
