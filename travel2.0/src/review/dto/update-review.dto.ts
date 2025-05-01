// import { PartialType } from '@nestjs/mapped-types';
// import { CreateReviewDto } from './create-review.dto';

// export class UpdateReviewDto extends PartialType(CreateReviewDto) {}

import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  reviewer_name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  tripId?: number;
}
