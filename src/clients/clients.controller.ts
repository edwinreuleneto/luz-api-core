// Controllers
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientQueryDto } from './dto/client-query.dto';
import { SetFileDto } from '../files/dto/set-file.dto';

@ApiTags('clients')
@Controller('api/v1/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar clientes com filtros e paginação' })
  findAll(@Query() query: ClientQueryDto) {
    return this.clientsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cliente' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientsService.remove(id);
  }

  @Patch(':id/logo-file')
  @ApiOperation({ summary: 'Definir logo (fileId) do cliente' })
  setLogo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    return this.clientsService.setLogo(id, dto.fileId);
  }

  @Patch(':id/doc-file')
  @ApiOperation({ summary: 'Definir documento principal (fileId) do cliente' })
  setDoc(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    return this.clientsService.setDoc(id, dto.fileId);
  }
}
