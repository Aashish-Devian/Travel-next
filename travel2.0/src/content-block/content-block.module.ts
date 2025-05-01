import { Module } from '@nestjs/common';
import { ContentBlockController } from './content-block.controller';
import { ContentBlockService } from './content-block.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentBlock } from './entities/content-block.entity';
import { MinioModule } from 'src/minio/minio.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentBlock]),
    MinioModule,
    ConfigModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ContentBlockController],
  providers: [ContentBlockService],
  exports: [TypeOrmModule],
})
export class ContentBlockModule {}
