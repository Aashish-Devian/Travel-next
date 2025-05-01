import { IsNotEmpty, IsString, IsUrl, IsIn } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['image', 'video'], {
    message: 'Media type must be either image or video',
  })
  media_type: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  tripId: number;
}
