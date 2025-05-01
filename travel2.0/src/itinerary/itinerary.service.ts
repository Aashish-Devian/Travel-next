import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ContentBlock } from 'src/content-block/entities/content-block.entity';

@Injectable()
export class ItineraryService {
  constructor(
    @InjectRepository(Itinerary)
    private itineraryRepository: Repository<Itinerary>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(ContentBlock)
    private readonly contentBlockRepository: Repository<ContentBlock>,
  ) {}

  async create(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createItineraryDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const { contentBlocks, ...itineraryData } = createItineraryDto;
    // Save itinerary with trip
    const itinerary = this.itineraryRepository.create({
      ...itineraryData,
      trip: trip,
    });
    const savedItinerary = await this.itineraryRepository.save(itinerary);

    // Save content blocks
    if (contentBlocks && contentBlocks.length > 0) {
      const contentBlockEntities = contentBlocks.map((block) =>
        this.contentBlockRepository.create({
          ...block,
          itinerary: savedItinerary,
        }),
      );
      await this.contentBlockRepository.save(contentBlockEntities);
    }

    return savedItinerary;
  }
  async findAll(): Promise<Itinerary[]> {
    return this.itineraryRepository.find({ relations: ['trip'] });
  }

  async findOne(id: number): Promise<Itinerary> {
    const itinerary = await this.itineraryRepository.findOne({
      where: { id: id },
      relations: ['trip'],
    });

    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }

    return itinerary;
  }

  async update(
    id: number,
    updateItineraryDto: UpdateItineraryDto,
  ): Promise<Itinerary> {
    const itinerary = await this.itineraryRepository.findOne({
      where: { id: id },
      relations: ['trip'],
    });

    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }

    if (updateItineraryDto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateItineraryDto.tripId },
      });

      if (!trip) {
        throw new NotFoundException('Trip not found');
      }

      itinerary.trip = trip;
    }

    itinerary.description =
      updateItineraryDto.description ?? itinerary.description;
    itinerary.title = updateItineraryDto.title ?? itinerary.title;
    itinerary.maxAltitude =
      updateItineraryDto.maxAltitude ?? itinerary.maxAltitude;
    itinerary.accommodation =
      updateItineraryDto.accommodation ?? itinerary.accommodation;
    itinerary.meals = updateItineraryDto.meals ?? itinerary.meals;
    itinerary.notes = updateItineraryDto.notes ?? itinerary.notes;

    return this.itineraryRepository.save(itinerary);
  }

  async remove(id: number): Promise<void> {
    const itinerary = await this.itineraryRepository.findOne({
      where: { id: id },
    });

    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }

    await this.itineraryRepository.remove(itinerary);
  }
}
