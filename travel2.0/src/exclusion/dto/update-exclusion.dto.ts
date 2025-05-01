// import { PartialType } from '@nestjs/mapped-types';
// import { CreateExclusionDto } from './create-exclusion.dto';

// export class UpdateExclusionDto extends PartialType(CreateExclusionDto) {}

import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateExclusionDto {
  @IsString()
  @IsOptional()
  detail?: string; // Optional updated detail text for the exclusion

  @IsInt()
  @IsOptional()
  tripId?: number; // Optional new Trip ID to associate the exclusion with
}
