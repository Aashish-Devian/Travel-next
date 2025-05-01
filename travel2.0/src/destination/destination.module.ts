import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination, Trip])],
  controllers: [DestinationController],
  providers: [DestinationService],
  exports: [TypeOrmModule],
})
export class DestinationModule {}
