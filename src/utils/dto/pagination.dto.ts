import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPaginate } from './../types/filter.interface';

export class PaginationDto implements IPaginate {
  @ApiPropertyOptional({})
  offset: number;

  @ApiPropertyOptional({})
  limit: number;

  @ApiPropertyOptional({})
  order: -1 | 1;
}
