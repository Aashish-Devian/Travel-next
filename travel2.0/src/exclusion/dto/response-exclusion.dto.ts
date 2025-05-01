import { Trip } from 'src/trip/entities/trip.entity';

export class ResponseExclusionDto {
  exclusion_id: number; // Primary key for the exclusion
  detail: string; // Detail text for the exclusion
  trip: Trip; // Trip entity associated with this exclusion
}
