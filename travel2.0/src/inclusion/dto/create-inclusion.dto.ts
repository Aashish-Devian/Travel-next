import { IsNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateInclusionDto {
  @IsNumber()
  @IsNotEmpty()
  tripId: number; // Single trip ID for all inclusions

  @IsArray()
  @IsNotEmpty()
  details: string[]; // Array of inclusion details
}
