import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exclusion } from './entities/exclusion.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';

@Injectable()
export class ExclusionService {
  constructor(
    @InjectRepository(Exclusion)
    private exclusionRepository: Repository<Exclusion>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  // Create a new exclusion
  async create(createExclusionDto: CreateExclusionDto): Promise<Exclusion> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createExclusionDto.tripId }, // Ensure trip_id matches your Trip entity primary key
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const exclusion = this.exclusionRepository.create({
      detail: createExclusionDto.detail,
      trip,
    });

    return this.exclusionRepository.save(exclusion);
  }

  // Find all exclusions
  async findAll(): Promise<Exclusion[]> {
    return this.exclusionRepository.find({ relations: ['trip'] });
  }

  // Find one exclusion by ID
  async findOne(id: number): Promise<Exclusion> {
    const exclusion = await this.exclusionRepository.findOne({
      where: { exclusion_id: id },
      relations: ['trip'],
    });

    if (!exclusion) {
      throw new NotFoundException('Exclusion not found');
    }

    return exclusion;
  }

  // Update an exclusion
  async update(
    id: number,
    updateExclusionDto: UpdateExclusionDto,
  ): Promise<Exclusion> {
    const exclusion = await this.exclusionRepository.findOne({
      where: { exclusion_id: id },
      relations: ['trip'],
    });

    if (!exclusion) {
      throw new NotFoundException('Exclusion not found');
    }

    if (updateExclusionDto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateExclusionDto.tripId },
      });
      if (!trip) {
        throw new NotFoundException('Trip not found');
      }
      exclusion.trip = trip;
    }

    exclusion.detail = updateExclusionDto.detail ?? exclusion.detail;

    return this.exclusionRepository.save(exclusion);
  }

  // Delete an exclusion
  async remove(id: number): Promise<void> {
    const exclusion = await this.exclusionRepository.findOne({
      where: { exclusion_id: id },
    });

    if (!exclusion) {
      throw new NotFoundException('Exclusion not found');
    }

    await this.exclusionRepository.remove(exclusion);
  }
}
