import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateExclusionDto {
  @IsString()
  @IsNotEmpty()
  detail: string; // The exclusion detail text

  @IsInt()
  @IsNotEmpty()
  tripId: number; // Foreign key to associate with a Trip entity
}
