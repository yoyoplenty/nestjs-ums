import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './../../services/base-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { regexSearchQuery } from './../../helpers/search-query';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, 'user');
  }

  async findAllAndSearch(query: QueryUserDto): Promise<{ data: any; message: string }> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const users = await this.userRepository.paginate(filter);
    if (!users || users.length < 1) throw new NotFoundException(`users not found`);

    return { data: users, message: `users successfully fetched` };
  }
}
