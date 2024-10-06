import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BaseRepository } from './../../repositories/base-repository';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name, 'old') private userModel: Model<UserDocument>) {
    super(userModel);
  }
}
