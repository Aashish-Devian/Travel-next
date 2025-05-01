import { Trip } from 'src/trip/entities/trip.entity';
import { ContentBlock } from 'src/content-block/entities/content-block.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('itinerary')
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  maxAltitude: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => ContentBlock, (block) => block.itinerary, { cascade: true })
  contentBlocks: ContentBlock[];

  @Column()
  accommodation: string;

  @Column()
  meals: string;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne(() => Trip, (trip) => trip.itineraries)
  trip: Trip;
}
