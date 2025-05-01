import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('destinations')
export class Destination {
  @PrimaryGeneratedColumn()
  destination_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Trip, (trip) => trip.destinations)
  trip: Trip;
}
