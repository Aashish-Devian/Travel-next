// import { PartialType } from '@nestjs/mapped-types';
// import { CreateFaqDto } from './create-faq.dto';

// export class UpdateFaqDto extends PartialType(CreateFaqDto) {}

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateFAQDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsNumber()
  tripId?: number;
}
