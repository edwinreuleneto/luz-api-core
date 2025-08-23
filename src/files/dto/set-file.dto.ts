// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetFileDto {
  @ApiProperty()
  @IsUUID()
  fileId!: string;
}
