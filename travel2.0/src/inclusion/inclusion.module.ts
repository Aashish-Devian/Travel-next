import { Module } from '@nestjs/common';
import { InclusionService } from './inclusion.service';
import { InclusionController } from './inclusion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inclusion } from './entities/inclusion.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inclusion, Trip]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [InclusionController],
  providers: [InclusionService, RolesGuard],
  exports: [TypeOrmModule],
})
export class InclusionModule {}
