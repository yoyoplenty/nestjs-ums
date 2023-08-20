import { Injectable } from '@nestjs/common';
import { BaseService } from './../../services/base-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, 'user');
  }
}
