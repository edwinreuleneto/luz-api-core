// DTOs
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PresignDto {
  @ApiProperty({ example: 'org/<orgId>/cases/<caseId>/arquivo.pdf' })
  @IsString()
  key!: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  contentType!: string;

  @ApiProperty({ required: false, example: 900 })
  @IsOptional()
  @IsInt()
  @Min(60)
  expiresSeconds?: number;
}

