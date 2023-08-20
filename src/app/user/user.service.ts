import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserDocument } from './schemas/user.schema';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(CreateUserPayload: CreateUserDto): Promise<UserDocument> {
    return await this.userRepository.create(CreateUserPayload);
  }

  async findAllUser(query: QueryUserDto): Promise<UserDocument[]> {
    return await this.userRepository.paginate(query);
  }

  async findOneUser(query: QueryUserDto): Promise<UserDocument> {
    return await this.userRepository.findOne(query);
  }
}
