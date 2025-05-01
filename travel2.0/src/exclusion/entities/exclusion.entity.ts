import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('exclusions')
export class Exclusion {
  @PrimaryGeneratedColumn()
  exclusion_id: number;

  @Column({ type: 'text' })
  detail: string;

  @ManyToOne(() => Trip, (trip) => trip.exclusions)
  trip: Trip;
}
