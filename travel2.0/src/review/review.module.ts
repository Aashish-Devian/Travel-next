import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Trip])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [TypeOrmModule],
})
export class ReviewModule {}
