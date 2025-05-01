// import { Trip } from 'src/trip/entities/trip.entity';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';

// @Entity('inclusions')
// export class Inclusion {
//   @PrimaryGeneratedColumn()
//   inclusion_id: number;

//   @Column({ type: 'text' })
//   detail: string;

//   @ManyToOne(() => Trip, (trip) => trip.inclusions)
//   @JoinColumn({ name: 'tripId' })
//   trip: Trip;

//   @Column()
//   tripId: number;
// }

import { Trip } from 'src/trip/entities/trip.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('inclusions')
export class Inclusion {
  @PrimaryGeneratedColumn()
  inclusion_id: number; // Primary key for inclusion

  @Column({ type: 'text' })
  detail: string; // Description or detail of the inclusion

  @ManyToOne(() => Trip, (trip) => trip.inclusions)
  @JoinColumn({ name: 'trip_id' }) // Ensuring consistency with snake_case
  trip: Trip; // The associated trip entity

  @Column()
  trip_id: number; // Foreign key referencing the trip
}
