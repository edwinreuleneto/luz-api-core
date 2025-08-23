// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddResponsibleDto {
  @ApiProperty()
  @IsUUID()
  userId!: string;
}
