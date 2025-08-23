// Entities
import { ApiProperty } from '@nestjs/swagger';

export class ContractEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  organizationId!: string;

  @ApiProperty({ required: false })
  clientId?: string;

  @ApiProperty({ required: false })
  fileId?: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
