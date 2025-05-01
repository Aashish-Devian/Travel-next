import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('media_gallery')
export class Media {
  @PrimaryGeneratedColumn()
  media_id: number;

  @Column({ type: 'varchar', length: 255 })
  media_type: string; // 'image' or 'video'

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  section: string; // 'overview', 'itinerary', 'gallery'

  @ManyToOne(() => Trip, (trip) => trip.media_gallery)
  trip: Trip;
}
