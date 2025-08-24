// Services
import { ClientsService } from './clients.service';
import { PrismaService } from '../prisma/prisma.service';

// DTOs
import { CreateClientDto } from './dto/create-client.dto';

// Utils
import { transformClient } from './helper/transform';

// Others
import { PersonType } from '../../generated/prisma';

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: { client: { client: { create: jest.Mock } } };

  beforeEach(() => {
    prisma = {
      client: {
        client: {
          create: jest.fn(),
        },
      },
    } as any;
    service = new ClientsService(prisma as unknown as PrismaService);
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto: CreateClientDto = {
        organizationId: 'org1',
        personType: PersonType.PF,
        fullName: 'John Doe',
      };
      const prismaResponse = {
        id: '1',
        organizationId: dto.organizationId,
        personType: dto.personType,
        fullName: dto.fullName,
        companyName: null,
        cpf: null,
        cnpj: null,
        email: null,
        phone: null,
        website: null,
        notes: null,
        logoFileId: null,
        docMainFileId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.client.client.create.mockResolvedValue(prismaResponse);

      const result = await service.create(dto);

      expect(prisma.client.client.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(transformClient(prismaResponse));
    });
  });
});
