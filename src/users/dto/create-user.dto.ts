import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserRole } from '../entities/user.enums';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  oab?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  profileFileId?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.CLIENTE })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.CLIENTE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  supervisorId?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  consentLgpd?: boolean = false;
}
