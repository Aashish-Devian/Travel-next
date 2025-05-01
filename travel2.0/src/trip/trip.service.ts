import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { Category } from 'src/category/entities/category.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Itinerary } from 'src/itinerary/entities/itinerary.entity';
import { Inclusion } from 'src/inclusion/entities/inclusion.entity';
import { Exclusion } from 'src/exclusion/entities/exclusion.entity';
import { Cost } from 'src/cost/entities/cost.entity';
import { FAQ } from 'src/faq/entities/faq.entity';
import { Review } from 'src/review/entities/review.entity';
import { Media } from 'src/media/entities/media.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Destination } from 'src/destination/entities/destination.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(Itinerary)
    private readonly itineraryRepository: Repository<Itinerary>,
    @InjectRepository(Inclusion)
    private readonly inclusionRepository: Repository<Inclusion>,
    @InjectRepository(Exclusion)
    private readonly exclusionRepository: Repository<Exclusion>,
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
    @InjectRepository(FAQ)
    private readonly faqRepository: Repository<FAQ>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return await this.tripRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const category = await entityManager.findOne(Category, {
          where: { category_id: createTripDto.categoryId },
        });

        if (!category) {
          throw new BadRequestException(
            `Category with ID ${createTripDto.categoryId} not found`,
          );
        }

        const trip = entityManager.create(Trip, {
          ...createTripDto,
          category,
        });

        const savedTrip = await entityManager.save(trip);
        return savedTrip;
      },
    );
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find({
      relations: [
        'category',
        'inclusions',
        'itineraries',
        'itineraries.contentBlocks',
      ],
    });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: id },
      relations: [
        'category',
        'itineraries',
        'inclusions',
        'exclusions',
        'costs',
        'faqs',
        'reviews',
        'media_gallery',
        'bookings',
        'destinations',
      ],
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }

  async findByCategory(categoryId: number): Promise<Trip[]> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.tripRepository.find({
      where: { category: { category_id: categoryId } },
      relations: ['category'],
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: id },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    if (updateTripDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { category_id: updateTripDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      trip.category = category;
    }

    trip.title = updateTripDto.title ?? trip.title;
    trip.description = updateTripDto.description ?? trip.description;
    trip.duration_days = updateTripDto.duration_days ?? trip.duration_days;

    return this.tripRepository.save(trip);
  }

  async remove(id: number): Promise<void> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: id },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    await this.tripRepository.remove(trip);
  }
}
