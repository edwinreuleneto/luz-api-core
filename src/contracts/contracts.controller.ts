// Controllers
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ContractsService } from './contracts.service';
import { SetFileDto } from '../files/dto/set-file.dto';
import { AddResponsibleDto } from './dto/add-responsible.dto';
import { LinkContractDto } from './dto/link-contract.dto';

@ApiTags('contracts')
@Controller('api/v1/contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @ApiOperation({ summary: 'Vincular contrato publicado a cliente' })
  linkToClient(@Body() dto: LinkContractDto) {
    return this.contractsService.linkToClient(dto);
  }

  @Patch(':id/file')
  @ApiOperation({ summary: 'Definir arquivo principal (fileId) do contrato' })
  setFile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    return this.contractsService.setFile(id, dto.fileId);
  }

  @Post(':id/responsibles')
  @ApiOperation({ summary: 'Adicionar usuário responsável ao contrato' })
  addResponsible(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AddResponsibleDto,
  ) {
    return this.contractsService.addResponsible(id, dto.userId);
  }
}
