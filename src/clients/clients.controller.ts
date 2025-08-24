// Controllers
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(ClientsController.name);

  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  async create(@Body() dto: CreateClientDto) {
    try {
      return await this.clientsService.create(dto);
    } catch (error) {
      this.logger.error('Error creating client', (error as Error).stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar clientes com filtros e paginação' })
  async findAll(@Query() query: ClientQueryDto) {
    try {
      return await this.clientsService.findAll(query);
    } catch (error) {
      this.logger.error('Error listing clients', (error as Error).stack);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.clientsService.findOne(id);
    } catch (error) {
      this.logger.error(`Error fetching client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateClientDto,
  ) {
    try {
      return await this.clientsService.update(id, dto);
    } catch (error) {
      this.logger.error(`Error updating client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cliente' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.clientsService.remove(id);
    } catch (error) {
      this.logger.error(`Error removing client ${id}`, (error as Error).stack);
      throw error;
    }
  }

  @Patch(':id/logo-file')
  @ApiOperation({ summary: 'Definir logo (fileId) do cliente' })
  async setLogo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    try {
      return await this.clientsService.setLogo(id, dto.fileId);
    } catch (error) {
      this.logger.error(
        `Error setting logo for client ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  @Patch(':id/doc-file')
  @ApiOperation({ summary: 'Definir documento principal (fileId) do cliente' })
  async setDoc(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SetFileDto,
  ) {
    try {
      return await this.clientsService.setDoc(id, dto.fileId);
    } catch (error) {
      this.logger.error(
        `Error setting doc for client ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
