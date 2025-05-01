import { Module } from '@nestjs/common';
import { ExclusionService } from './exclusion.service';
import { ExclusionController } from './exclusion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exclusion } from './entities/exclusion.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exclusion, Trip])],
  controllers: [ExclusionController],
  providers: [ExclusionService],
  exports: [TypeOrmModule],
})
export class ExclusionModule {}
