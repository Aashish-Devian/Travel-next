import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('costs')
export class Cost {
  @PrimaryGeneratedColumn()
  cost_id: number;

  @Column({ type: 'varchar', length: 255 })
  cost_type: string; // e.g., 'Base Price', 'Optional Cost'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Trip, (trip) => trip.costs)
  trip: Trip;
}
