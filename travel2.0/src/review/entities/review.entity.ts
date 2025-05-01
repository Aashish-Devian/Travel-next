import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column({ type: 'varchar', length: 255 })
  reviewer_name: string;

  @Column({ type: 'int' })
  rating: number; // 1-5 stars

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Trip, (trip) => trip.reviews)
  trip: Trip;
}
