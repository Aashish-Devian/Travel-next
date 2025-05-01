import { IsOptional, IsString, IsInt, IsDate } from 'class-validator';

export class UpdateTripDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  duration_days?: number;

  @IsOptional()
  @IsString()
  difficulty_level?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsInt()
  max_group_size?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  fetured_image?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  categoryId?: number;
}
