import { ApiPropertyOptional } from '@nestjs/swagger';
import { IQueryUser } from '../types/user.interface';

export class QueryUserDto implements IQueryUser {
  @ApiPropertyOptional({ example: '6532tyf632ytd23dy7' })
  email?: string;
}
