// Entities
import { ApiProperty } from '@nestjs/swagger';
import { PersonType } from '@prisma/client';

export class ClientEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  organizationId!: string;

  @ApiProperty({ enum: PersonType })
  personType!: PersonType;

  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false })
  cpf?: string;

  @ApiProperty({ required: false })
  cnpj?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  logoFileId?: string;

  @ApiProperty({ required: false })
  docMainFileId?: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
