// import { Injectable } from '@nestjs/common';
// import { CreateFaqDto } from './dto/create-faq.dto';
// import { UpdateFaqDto } from './dto/update-faq.dto';

// @Injectable()
// export class FaqService {
//   create(createFaqDto: CreateFaqDto) {
//     return 'This action adds a new faq';
//   }

//   findAll() {
//     return `This action returns all faq`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} faq`;
//   }

//   update(id: number, updateFaqDto: UpdateFaqDto) {
//     return `This action updates a #${id} faq`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} faq`;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FAQ } from './entities/faq.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateFAQDto } from './dto/create-faq.dto';
import { UpdateFAQDto } from './dto/update-faq.dto';

@Injectable()
export class FAQService {
  constructor(
    @InjectRepository(FAQ)
    private faqRepository: Repository<FAQ>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async create(createFAQDto: CreateFAQDto): Promise<FAQ> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createFAQDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const faq = this.faqRepository.create({
      question: createFAQDto.question,
      answer: createFAQDto.answer,
      trip,
    });

    return this.faqRepository.save(faq);
  }

  async findAll(): Promise<FAQ[]> {
    return this.faqRepository.find({ relations: ['trip'] });
  }

  async findOne(id: number): Promise<FAQ> {
    const faq = await this.faqRepository.findOne({
      where: { faq_id: id },
      relations: ['trip'],
    });

    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }

    return faq;
  }

  async update(id: number, updateFAQDto: UpdateFAQDto): Promise<FAQ> {
    const faq = await this.faqRepository.findOne({
      where: { faq_id: id },
      relations: ['trip'],
    });

    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }

    if (updateFAQDto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateFAQDto.tripId },
      });

      if (!trip) {
        throw new NotFoundException('Trip not found');
      }

      faq.trip = trip;
    }

    faq.question = updateFAQDto.question ?? faq.question;
    faq.answer = updateFAQDto.answer ?? faq.answer;

    return this.faqRepository.save(faq);
  }

  async remove(id: number): Promise<void> {
    const faq = await this.faqRepository.findOne({
      where: { faq_id: id },
    });

    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }

    await this.faqRepository.remove(faq);
  }
}
