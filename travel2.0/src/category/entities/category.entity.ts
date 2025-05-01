import { Trip } from 'src/trip/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Trip, (trip) => trip.category)
  trips: Trip[];
}
