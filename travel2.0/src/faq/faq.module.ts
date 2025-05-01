import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQ } from './entities/faq.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([FAQ, Trip]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [FAQController],
  providers: [FAQService],
  exports: [TypeOrmModule],
})
export class FaqModule {}
