// Entities
export class FileEntity {
  id!: string;
  name!: string;
  extension!: string;
  baseUrl!: string;
  folder!: string;
  file!: string;
  url!: string;
  size!: number;
  contentType?: string;
  eTag?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

