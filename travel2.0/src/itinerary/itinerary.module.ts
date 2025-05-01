import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ContentBlockModule } from 'src/content-block/content-block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary, Trip]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    ContentBlockModule,
  ],
  controllers: [ItineraryController],
  exports: [TypeOrmModule],
  providers: [ItineraryService, RolesGuard],
})
export class ItineraryModule {}
