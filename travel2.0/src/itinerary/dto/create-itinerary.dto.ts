import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContentBlockDto } from 'src/content-block/dto/create-content-block.dto';

export class CreateItineraryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  maxAltitude: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentBlockDto)
  contentBlocks: CreateContentBlockDto[];

  @IsNotEmpty()
  @IsString()
  accommodation: string;

  @IsNotEmpty()
  @IsString()
  meals: string;

  @IsNotEmpty()
  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsNumber()
  tripId: number;
}
