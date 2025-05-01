// import { PartialType } from '@nestjs/mapped-types';
// import { CreateMediaDto } from './create-media.dto';

// export class UpdateMediaDto extends PartialType(CreateMediaDto) {}

import { IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  @IsIn(['image', 'video'], {
    message: 'Media type must be either image or video',
  })
  media_type?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  tripId?: number;
}
