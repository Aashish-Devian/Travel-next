import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Trip } from 'src/trip/entities/trip.entity';
import { Destination } from './entities/destination.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  // Create a new destination
  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    const trip = await this.tripRepository.findOne(createDestinationDto.tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    const destination = this.destinationRepository.create({
      name: createDestinationDto.name,
      description: createDestinationDto.description,
      trip,
    });

    return this.destinationRepository.save(destination);
  }

  // Get all destinations
  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find({ relations: ['trip'] });
  }

  // Get a single destination by ID
  async findOne(id: number): Promise<Destination> {
    const destination = await this.destinationRepository.findOne({
      where: { destination_id: id },
      relations: ['trip'],
    });
    if (!destination) {
      throw new Error('Destination not found');
    }
    return destination;
  }

  // Update a destination
  async update(
    id: number,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    const destination = await this.destinationRepository.findOne({
      where: { destination_id: id },
      relations: ['trip'],
    });

    if (!destination) {
      throw new Error('Destination not found');
    }

    if (updateDestinationDto.tripId) {
      const trip = await this.tripRepository.findOne(
        updateDestinationDto.tripId,
      );
      if (!trip) {
        throw new Error('Trip not found');
      }
      destination.trip = trip;
    }

    destination.name = updateDestinationDto.name ?? destination.name;
    destination.description =
      updateDestinationDto.description ?? destination.description;

    return this.destinationRepository.save(destination);
  }

  // Delete a destination
  async remove(id: number): Promise<void> {
    const destination = await this.destinationRepository.findOne({
      where: { destination_id: id },
    });
    if (!destination) {
      throw new Error('Destination not found');
    }
    await this.destinationRepository.remove(destination);
  }
}
