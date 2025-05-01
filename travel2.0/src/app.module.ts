import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TripModule } from './trip/trip.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { InclusionModule } from './inclusion/inclusion.module';
import { ExclusionModule } from './exclusion/exclusion.module';
import { CostModule } from './cost/cost.module';
import { FaqModule } from './faq/faq.module';
import { ReviewModule } from './review/review.module';
import { MediaModule } from './media/media.module';
import { DestinationModule } from './destination/destination.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ContentBlockModule } from './content-block/content-block.module';
import { MinioController } from './minio/minio.controller';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Ensure secret is loaded from environment variables
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    CategoryModule,
    TripModule,
    ItineraryModule,
    InclusionModule,
    ExclusionModule,
    CostModule,
    FaqModule,
    ReviewModule,
    MediaModule,
    DestinationModule,
    BookingModule,
    UserModule,
    DatabaseModule,
    ContentBlockModule,
    MinioModule,
  ],
  controllers: [AppController, MinioController],
  providers: [AppService, SeederService],
})
export class AppModule {}
