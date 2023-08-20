import { ApiPropertyOptional } from '@nestjs/swagger';
import { ROLE } from './../../../enums/role.enum';
import { IQueryUser } from '../types/user.interface';
import { PaginationDto } from './../../../utils/dto/pagination.dto';
export class QueryUserDto extends PaginationDto implements IQueryUser {
  @ApiPropertyOptional({ example: '6532tyf632ytd23dy7' })
  _id?: string;

  @ApiPropertyOptional({ example: 'plenty003' })
  userName?: string;

  @ApiPropertyOptional({ example: 'jane' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'doe' })
  lastName?: string;

  @ApiPropertyOptional({ example: 'mee' })
  middleName?: string;

  @ApiPropertyOptional({ example: 'admin@gmail.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'user' })
  role?: ROLE;
}
