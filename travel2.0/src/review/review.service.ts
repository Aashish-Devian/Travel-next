// import { Injectable } from '@nestjs/common';
// import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';

// @Injectable()
// export class ReviewService {
//   create(createReviewDto: CreateReviewDto) {
//     return 'This action adds a new review';
//   }

//   findAll() {
//     return `This action returns all review`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} review`;
//   }

//   update(id: number, updateReviewDto: UpdateReviewDto) {
//     return `This action updates a #${id} review`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} review`;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const trip = await this.tripRepository.findOne({
      where: { trip_id: createReviewDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const review = this.reviewRepository.create({
      reviewer_name: createReviewDto.reviewer_name,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      trip,
    });

    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['trip'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
      relations: ['trip'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
      relations: ['trip'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (updateReviewDto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { trip_id: updateReviewDto.tripId },
      });

      if (!trip) {
        throw new NotFoundException('Trip not found');
      }

      review.trip = trip;
    }

    review.reviewer_name =
      updateReviewDto.reviewer_name ?? review.reviewer_name;
    review.rating = updateReviewDto.rating ?? review.rating;
    review.comment = updateReviewDto.comment ?? review.comment;

    return this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.remove(review);
  }
}
