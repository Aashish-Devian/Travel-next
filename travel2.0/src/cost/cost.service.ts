// import { Injectable } from '@nestjs/common';
// import { CreateCostDto } from './dto/create-cost.dto';
// import { UpdateCostDto } from './dto/update-cost.dto';

// @Injectable()
// export class CostService {
//   create(createCostDto: CreateCostDto) {
//     return 'This action adds a new cost';
//   }

//   findAll() {
//     return `This action returns all cost`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} cost`;
//   }

//   update(id: number, updateCostDto: UpdateCostDto) {
//     return `This action updates a #${id} cost`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} cost`;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cost } from './entities/cost.entity';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { Trip } from 'src/trip/entities/trip.entity';

@Injectable()
export class CostService {
  constructor(
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async create(createCostDto: CreateCostDto): Promise<Cost> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createCostDto.trip_id },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const cost = this.costRepository.create({ ...createCostDto, trip });
    return await this.costRepository.save(cost);
  }

  async findAll(): Promise<Cost[]> {
    return await this.costRepository.find({ relations: ['trip'] });
  }

  async findOne(id: number): Promise<Cost> {
    const cost = await this.costRepository.findOne({
      where: { cost_id: id },
      relations: ['trip'],
    });

    if (!cost) {
      throw new NotFoundException(`Cost with ID ${id} not found`);
    }

    return cost;
  }

  async update(id: number, updateCostDto: UpdateCostDto): Promise<Cost> {
    const cost = await this.findOne(id);

    if (updateCostDto.trip_id) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateCostDto.trip_id },
      });
      if (!trip) {
        throw new NotFoundException('Trip not found');
      }
      cost.trip = trip;
    }

    Object.assign(cost, updateCostDto);
    return await this.costRepository.save(cost);
  }

  async remove(id: number): Promise<void> {
    const cost = await this.findOne(id);
    await this.costRepository.remove(cost);
  }
}
