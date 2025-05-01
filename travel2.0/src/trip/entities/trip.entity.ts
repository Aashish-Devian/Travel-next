import { Booking } from 'src/booking/entities/booking.entity';
import { Category } from 'src/category/entities/category.entity';
import { Cost } from 'src/cost/entities/cost.entity';
import { Destination } from 'src/destination/entities/destination.entity';
import { Exclusion } from 'src/exclusion/entities/exclusion.entity';
import { FAQ } from 'src/faq/entities/faq.entity';
import { Inclusion } from 'src/inclusion/entities/inclusion.entity';
import { Itinerary } from 'src/itinerary/entities/itinerary.entity';
import { Media } from 'src/media/entities/media.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  trip_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  duration_days: number;

  @Column({ type: 'varchar', length: 255 })
  difficulty_level: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  max_group_size: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  featured_image: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @ManyToOne(() => Category, (category) => category.trips)
  category: Category;

  @OneToMany(() => Itinerary, (itinerary) => itinerary.trip)
  itineraries: Itinerary[];

  @OneToMany(() => Inclusion, (inclusion) => inclusion.trip)
  inclusions: Inclusion[];

  @OneToMany(() => Exclusion, (exclusion) => exclusion.trip)
  exclusions: Exclusion[];

  @OneToMany(() => Cost, (cost) => cost.trip)
  costs: Cost[];

  @OneToMany(() => FAQ, (faq) => faq.trip)
  faqs: FAQ[];

  @OneToMany(() => Review, (review) => review.trip)
  reviews: Review[];

  @OneToMany(() => Media, (media) => media.trip)
  media_gallery: Media[];

  @OneToMany(() => Booking, (booking) => booking.trip)
  bookings: Booking[];

  @OneToMany(() => Destination, (destination) => destination.trip)
  destinations: Destination[];
}
