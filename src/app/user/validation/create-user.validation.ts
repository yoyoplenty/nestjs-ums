import { PipeTransform, Injectable, ArgumentMetadata, ConflictException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log(metadata);

    const user = await this.userRepository.findOne({ email: value.email });
    if (user) throw new ConflictException('user already exists');

    return value;
  }
}
