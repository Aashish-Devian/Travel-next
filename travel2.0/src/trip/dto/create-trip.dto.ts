import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { IsOptional, IsArray, IsDateString, IsNumber } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  duration_days: number;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsString()
  difficulty_level?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsInt()
  max_group_size?: number;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  // @IsOptional()
  // @IsArray()
  // itineraries?: number[];

  // @IsOptional()
  // @IsArray()
  // inclusions?: number[];

  // @IsOptional()
  // @IsArray()
  // exclusions?: number[];

  // @IsOptional()
  // @IsArray()
  // costs?: number[];

  // @IsOptional()
  // @IsArray()
  // faqs?: number[];

  // @IsOptional()
  // @IsArray()
  // reviews?: number[];

  // @IsOptional()
  // @IsArray()
  // media_gallery?: number[];

  // @IsOptional()
  // @IsArray()
  // bookings?: number[];

  // @IsOptional()
  // @IsArray()
  // destinations?: number[];
}
