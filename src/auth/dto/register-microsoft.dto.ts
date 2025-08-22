import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterMicrosoftDto extends CreateUserDto {
  @ApiProperty()
  @IsString()
  idToken: string;
}
