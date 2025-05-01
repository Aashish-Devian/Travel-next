import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { CategoryModule } from 'src/category/category.module';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { InclusionModule } from 'src/inclusion/inclusion.module';
import { ExclusionModule } from 'src/exclusion/exclusion.module';
import { CostModule } from 'src/cost/cost.module';
import { FaqModule } from 'src/faq/faq.module';
import { ReviewModule } from 'src/review/review.module';
import { MediaModule } from 'src/media/media.module';
import { BookingModule } from 'src/booking/booking.module';
import { DestinationModule } from 'src/destination/destination.module';
import { ItineraryModule } from 'src/itinerary/itinerary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    CategoryModule,
    InclusionModule,
    ExclusionModule,
    CostModule,
    FaqModule,
    ReviewModule,
    MediaModule,
    BookingModule,
    DestinationModule,
    ItineraryModule,
  ],
  controllers: [TripController],
  providers: [TripService, RolesGuard],
})
export class TripModule {}
