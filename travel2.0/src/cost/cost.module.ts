import { Module } from '@nestjs/common';
import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cost, Trip])],
  controllers: [CostController],
  providers: [CostService],
  exports: [TypeOrmModule],
})
export class CostModule {}
