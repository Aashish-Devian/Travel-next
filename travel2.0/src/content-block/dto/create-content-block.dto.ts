// import {
//   IsEnum,
//   IsInt,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
// } from 'class-validator';
// import { Transform } from 'class-transformer';

// export class CreateContentBlockDto {
//   @IsNotEmpty()
//   // @IsEnum(['text', 'image', 'mixed'])
//   type: 'text' | 'image' | 'mixed';

//   @IsString()
//   @IsOptional()
//   textContent?: string;

//   @IsOptional()
//   image?: any;

//   @IsInt()
//   @Transform(({ value }) => parseInt(value, 10))
//   position: number;

//   // @IsInt()
//   // itineraryId: number;
// }

import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ContentBlockType {
  TEXT = 'text',
  IMAGE = 'image',
  MIXED = 'mixed',
}

export class CreateContentBlockDto {
  @ApiProperty({
    enum: ContentBlockType,
    description: 'Type of the content block',
  })
  @IsEnum(ContentBlockType)
  type: ContentBlockType;

  @ApiProperty({ required: false, description: 'Text content of the block' })
  @IsOptional()
  @IsString()
  textContent?: string;

  @ApiProperty({ required: false, description: 'URL of the image' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ description: 'Position of the content block' })
  // @IsInt()
  @IsString()
  position: any;

  // @ApiProperty({ description: 'ID of the associated itinerary' })
  // @IsInt()
  // @IsPositive()
  // itineraryId: number;
}
