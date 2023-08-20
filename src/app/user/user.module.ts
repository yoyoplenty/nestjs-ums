import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.plugin(require('mongoose-autopopulate'));

          UserSchema.pre('save', function () {
            console.log('Hello from pre save');
            //TODO, Hash password anc create token
            // if (!this.isModified("password")) return next();
            // const salt = await bcrypt.genSalt(10);
            // this.password = await bcrypt.hash(this.password, salt);
            // this.confirm_token = await utility.generateToken();
          });

          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export default class UserModule {}
