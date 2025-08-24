// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class LinkContractDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsUUID()
  fileId!: string;

  @ApiProperty()
  @IsUUID()
  clientId!: string;
}
