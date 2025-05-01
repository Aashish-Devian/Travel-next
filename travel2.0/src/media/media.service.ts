import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createMediaDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const media = this.mediaRepository.create({
      media_type: createMediaDto.media_type,
      url: createMediaDto.url,
      trip,
    });

    return this.mediaRepository.save(media);
  }

  async findAll(): Promise<Media[]> {
    return this.mediaRepository.find({ relations: ['trip'] });
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { media_id: id },
      relations: ['trip'],
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { media_id: id },
      relations: ['trip'],
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    if (updateMediaDto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateMediaDto.tripId },
      });

      if (!trip) {
        throw new NotFoundException('Trip not found');
      }

      media.trip = trip;
    }

    media.media_type = updateMediaDto.media_type ?? media.media_type;
    media.url = updateMediaDto.url ?? media.url;

    return this.mediaRepository.save(media);
  }

  async remove(id: number): Promise<void> {
    const media = await this.mediaRepository.findOne({
      where: { media_id: id },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    await this.mediaRepository.remove(media);
  }
}
