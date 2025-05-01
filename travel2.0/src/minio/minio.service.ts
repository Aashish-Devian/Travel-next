import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }

  // Uploads image to MinIO and returns the URL
  async uploadImage(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<string> {
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `/${fileName}`;

    console.log(file);

    await this.minioClient.putObject(
      bucketName,
      filePath,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );
    await this.minioClient.setBucketPolicy(
      bucketName,
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      }),
    );

    const fileUrl = `http://127.0.0.1:9000/${bucketName}/${filePath}`;
    return fileUrl;
  }
}
