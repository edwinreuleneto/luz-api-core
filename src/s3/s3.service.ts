// Services
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly s3 = new S3Client({ region: process.env.AWS_REGION });
  private readonly bucket = process.env.S3_BUCKET_NAME!;

  async presignPut(key: string, contentType: string, expiresSeconds?: number) {
    const expires = Number(expiresSeconds ?? process.env.S3_PRESIGN_EXPIRES ?? 900);
    const cmd = new PutObjectCommand({ Bucket: this.bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.s3, cmd, { expiresIn: expires });
    return { url, bucket: this.bucket, key, expiresSeconds: expires };
  }

  buildPublicUrl(key: string) {
    const base = process.env.PUBLIC_BASE_URL || `https://${this.bucket}.s3.amazonaws.com`;
    return `${base}/${key}`;
  }
}

