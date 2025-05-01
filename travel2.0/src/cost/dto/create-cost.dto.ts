import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateCostDto {
  @IsString()
  @IsNotEmpty()
  cost_type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  trip_id: number; // To associate cost with a trip
}
