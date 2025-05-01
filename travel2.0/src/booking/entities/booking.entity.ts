import { Trip } from 'src/trip/entities/trip.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column({ type: 'timestamp' })
  booking_date: Date;

  @ManyToOne(() => Trip, (trip) => trip.bookings)
  trip: Trip;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
