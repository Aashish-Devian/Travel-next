import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inclusion } from './entities/inclusion.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateInclusionDto } from './dto/create-inclusion.dto';
import { UpdateInclusionDto } from './dto/update-inclusion.dto';

@Injectable()
export class InclusionService {
  constructor(
    @InjectRepository(Inclusion)
    private inclusionRepository: Repository<Inclusion>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async create(createInclusionDto: CreateInclusionDto) {
    const inclusions: Inclusion[] = [];

    // Retrieve the trip by tripId
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createInclusionDto.tripId },
    });

    if (!trip) {
      throw new Error(`Trip with ID ${createInclusionDto.tripId} not found`);
    }

    // Create inclusion entries for each detail
    for (const detail of createInclusionDto.details) {
      const inclusion = this.inclusionRepository.create({
        detail: detail,
        trip: trip,
      });

      inclusions.push(inclusion);
    }

    // Save all inclusions at once
    return await this.inclusionRepository.save(inclusions);
  }

  /**
   * ! @ This is for the testing purposes only start
   */

  async getInclusionsForTrip(tripId: number) {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: tripId },
      relations: ['inclusions'],
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    return trip.inclusions; // Return inclusions for the given tripId
  }

  async updateInclusion(
    inclusionId: number,
    tripId: number,
    updateInclusionDto: UpdateInclusionDto,
  ) {
    // Find inclusion by inclusionId and tripId
    const inclusion = await this.inclusionRepository.findOne({
      where: { inclusion_id: inclusionId, trip_id: tripId },
    });

    if (!inclusion) {
      throw new Error('Inclusion not found for this trip');
    }

    // Update inclusion details
    inclusion.detail = updateInclusionDto.detail;

    // Save the updated inclusion
    return this.inclusionRepository.save(inclusion);
  }
  /**
   * ! @ This is for the testing purposes only end
   */

  // Delete an inclusion
  async remove(id: number): Promise<void> {
    const inclusion = await this.inclusionRepository.findOne({
      where: { inclusion_id: id },
    });

    if (!inclusion) {
      throw new NotFoundException('Inclusion not found');
    }

    await this.inclusionRepository.remove(inclusion);
  }
}
