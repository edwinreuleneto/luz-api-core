// Controllers
import {
  Body,
  Controller,
  Get,
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
import { ContractEntity } from './entities/contract.entity';

@ApiTags('contracts')
@Controller('api/v1/contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Listar contratos do usuário' })
  findAllByUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.contractsService.findAllByUser(userId);
  }

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

  @Get('user/:userId')
  @ApiOperation({ summary: 'Listar contratos associados a um usuário' })
  async findAllByUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<ContractEntity[]> {
    return await this.contractsService.findAllByUser(userId);
  }
}
