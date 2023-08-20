import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPaginate } from './../types/filter.interface';

export class PaginationDto implements IPaginate {
  @ApiPropertyOptional({ example: 2 })
  offset: number;

  @ApiPropertyOptional({ example: 5 })
  limit: number;

  @ApiPropertyOptional({ example: 1, type: 'integer' })
  sortOrder: -1 | 1;
}
