// Utils
import { ClientEntity } from '../../entities/client.entity';

export function transformClient(prismaClient: any): ClientEntity {
  return {
    ...prismaClient,
    fullName: prismaClient.fullName ?? undefined,
    companyName: prismaClient.companyName ?? undefined,
    cpf: prismaClient.cpf ?? undefined,
    cnpj: prismaClient.cnpj ?? undefined,
    email: prismaClient.email ?? undefined,
    phone: prismaClient.phone ?? undefined,
    website: prismaClient.website ?? undefined,
    notes: prismaClient.notes ?? undefined,
    logoFileId: prismaClient.logoFileId ?? undefined,
    docMainFileId: prismaClient.docMainFileId ?? undefined,
  };
}
