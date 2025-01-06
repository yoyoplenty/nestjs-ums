import { ApiPropertyOptional } from '@nestjs/swagger';
import { ROLE } from './../../../enums/role.enum';
import { IQueryUser } from '../types/user.interface';
import { PaginationDto } from './../../../utils/dto/pagination.dto';

export class QueryUserDto extends PaginationDto implements IQueryUser {
  @ApiPropertyOptional({})
  _id?: string;

  @ApiPropertyOptional({})
  userName?: string;

  @ApiPropertyOptional({})
  firstName?: string;

  @ApiPropertyOptional({})
  lastName?: string;

  @ApiPropertyOptional({})
  middleName?: string;

  @ApiPropertyOptional({})
  search?: string;

  @ApiPropertyOptional({})
  email?: string;

  @ApiPropertyOptional({})
  role?: ROLE;
}
