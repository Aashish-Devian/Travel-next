import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateInclusionDto {
  @IsString()
  detail: string;

  @IsOptional()
  @IsNumber()
  tripId?: number;
}
