// Entities
import { ApiProperty } from '@nestjs/swagger';

import { FileEntity } from '../../files/entities/file.entity';

export class ContractEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ required: false })
  clientId?: string;

  @ApiProperty({ required: false })
  fileId?: string;

  @ApiProperty({ type: () => FileEntity, required: false })
  file?: FileEntity;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
