import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('faqs')
export class FAQ {
  @PrimaryGeneratedColumn()
  faq_id: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @ManyToOne(() => Trip, (trip) => trip.faqs)
  trip: Trip;
}
