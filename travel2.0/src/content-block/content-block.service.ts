import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentBlock } from './entities/content-block.entity';
import { MinioService } from 'src/minio/minio.service';
import { CreateContentBlockDto } from './dto/create-content-block.dto';

@Injectable()
export class ContentBlockService {
  constructor(
    @InjectRepository(ContentBlock)
    private readonly contentBlockRepository: Repository<ContentBlock>,
    private readonly minioService: MinioService,
  ) {}

  // Create a new content block
  // async create(contentBlockData: Partial<ContentBlock>): Promise<ContentBlock> {
  //   const contentBlock = this.contentBlockRepository.create(contentBlockData);
  //   return this.contentBlockRepository.save(contentBlock);
  // }

  async create(
    createContentBlockDto: CreateContentBlockDto,
    file: Express.Multer.File,
  ): Promise<ContentBlock> {
    const { type, textContent, position } = createContentBlockDto;

    try {
      const contentBlock = new ContentBlock();
      contentBlock.type = type;
      contentBlock.textContent = textContent || '';

      // If the type is image or mixed, upload the image to MinIO
      if (type === 'image' || type === 'mixed') {
        if (file) {
          const bucketName = 'travell'; // Replace with your MinIO bucket name
          console.log(file);
          const imageUrl = await this.minioService.uploadImage(
            file,
            bucketName,
          );
          contentBlock.imageUrl = imageUrl;
        }
      }

      contentBlock.position = position;
      // contentBlock.itinerary = { id: itineraryId } as any; // Assuming the itinerary entity exists and is fetched

      return this.contentBlockRepository.save(contentBlock);
    } catch (error) {
      throw new Error('Failed to create content block: ' + error.message);
    }
  }

  // Get all content blocks for an itinerary
  async findByItinerary(itineraryId: number): Promise<ContentBlock[]> {
    return this.contentBlockRepository.find({
      where: { itinerary: { id: itineraryId } },
      order: { position: 'ASC' },
    });
  }

  // Update a content block
  async update(
    id: number,
    updateData: Partial<ContentBlock>,
  ): Promise<ContentBlock> {
    await this.contentBlockRepository.update(id, updateData);
    return this.contentBlockRepository.findOne({ where: { id } });
  }

  // Delete a content block
  async delete(id: number): Promise<void> {
    await this.contentBlockRepository.delete(id);
  }
}
