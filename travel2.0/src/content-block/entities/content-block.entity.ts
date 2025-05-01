import { Itinerary } from 'src/itinerary/entities/itinerary.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('content_block')
export class ContentBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'text' | 'image' | 'mixed'; // Defines whether the block is text, image, or both

  @Column({ type: 'text', nullable: true })
  textContent: string; // For text content (optional)

  @Column({ nullable: true })
  imageUrl: string; // For images (optional)

  @Column()
  position: number; // The order/position of the content block

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.contentBlocks)
  itinerary: Itinerary;
}
