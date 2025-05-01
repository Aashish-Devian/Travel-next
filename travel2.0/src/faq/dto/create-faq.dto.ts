import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFAQDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsNumber()
  tripId: number;
}
