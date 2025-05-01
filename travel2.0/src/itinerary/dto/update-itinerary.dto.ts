import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateItineraryDto {
  @IsOptional()
  @IsNumber()
  day_number?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  tripId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  maxAltitude?: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsOptional()
  @IsString()
  meals?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
