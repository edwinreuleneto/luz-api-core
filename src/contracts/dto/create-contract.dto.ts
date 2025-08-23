// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsUUID()
  organizationId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  fileId?: string;
}
