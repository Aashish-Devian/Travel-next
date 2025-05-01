// src/minio/minio.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file')) // 'file' is the form field name for the file
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const filePath = file.path; // Path where the file is saved temporarily
  //   console.log('Uploaded file:', file);

  //   try {
  //     const uploadResult = await this.minioService.uploadFile(filePath);
  //     return { message: 'File uploaded successfully', data: uploadResult };
  //   } catch (err) {
  //     return { message: 'Error uploading file', error: err.message };
  //   }
  // }
}
