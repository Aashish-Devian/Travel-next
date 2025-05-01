import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Itinerary } from 'src/itinerary/entities/itinerary.entity';

export class UpdateContentBlockDto {
  @IsOptional()
  @IsEnum(['text', 'image', 'mixed'])
  type?: 'text' | 'image' | 'mixed';

  @IsOptional()
  @IsString()
  textContent?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsOptional()
  itinerary?: Itinerary;
}
