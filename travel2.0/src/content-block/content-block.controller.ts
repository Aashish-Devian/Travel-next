import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ContentBlockService } from './content-block.service';
import { ContentBlock } from './entities/content-block.entity';
import {
  ContentBlockType,
  CreateContentBlockDto,
} from './dto/create-content-block.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('content-block')
export class ContentBlockController {
  constructor(private readonly contentBlockService: ContentBlockService) {}

  // Create a new content block

  @Post()
  @ApiOperation({ summary: 'Create a new content block' })
  @ApiResponse({
    status: 201,
    description: 'The content block has been successfully created.',
    type: ContentBlock,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: Object.values(ContentBlockType),
          description: 'Type of the content block',
        },
        position: {
          type: 'string',
          description: 'Position of the content block',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload (required for image type)',
        },
      },
    },
  })
  // async create(
  //   @Body() createContentBlockDto: CreateContentBlockDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   if (createContentBlockDto.type === ContentBlockType.IMAGE && !file) {
  //     throw new BadRequestException('File is required for image content type');
  //   }

  //   return this.contentBlockService.create(createContentBlockDto, file);
  // }
  async create(
    @Body() createContentBlockDto: CreateContentBlockDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (createContentBlockDto.type === ContentBlockType.IMAGE && !file) {
      throw new BadRequestException('File is required for image content type');
    }

    if (!file.buffer && file.path) {
      // If buffer is not available, read from the file path
      const fs = require('fs');
      file.buffer = fs.readFileSync(file.path);
    }

    return this.contentBlockService.create(createContentBlockDto, file);
  }

  // Get all content blocks for an itinerary
  @Get('itinerary/:itineraryId')
  async findByItinerary(
    @Param('itineraryId') itineraryId: number,
  ): Promise<ContentBlock[]> {
    return this.contentBlockService.findByItinerary(itineraryId);
  }

  // Update a content block
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<ContentBlock>,
  ): Promise<ContentBlock> {
    return this.contentBlockService.update(id, updateData);
  }

  // Delete a content block
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.contentBlockService.delete(id);
  }
}
