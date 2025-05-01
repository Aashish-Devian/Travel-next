import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tripId: any; // Foreign key to the Trip entity
}
