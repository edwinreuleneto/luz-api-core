import { ApiProperty } from '@nestjs/swagger';
import { UserRole, AccountStatus } from './user.enums';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firebaseUid: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  cpf?: string;

  @ApiProperty({ required: false })
  oab?: string;

  @ApiProperty({ required: false })
  profileFileId?: string;

  @ApiProperty({ default: false })
  mfaEnabled: boolean;

  @ApiProperty({ required: false })
  lastLogin?: Date;

  @ApiProperty({ default: 0 })
  failedAttempts: number;

  @ApiProperty({ enum: AccountStatus })
  accountStatus: AccountStatus;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ required: false })
  department?: string;

  @ApiProperty({ required: false })
  unit?: string;

  @ApiProperty({ required: false })
  supervisorId?: string;

  @ApiProperty({ default: false })
  consentLgpd: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
