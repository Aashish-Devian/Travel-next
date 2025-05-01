// src/minio/minio.module.ts
import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Import ConfigModule to load environment variables
  providers: [MinioService],
  controllers: [MinioController],
  exports: [MinioService], // Export MinioService for use in other modules
})
export class MinioModule {}
