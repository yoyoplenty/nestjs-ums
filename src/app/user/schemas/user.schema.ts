import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../types/user.interface';
import { ROLE } from './../../../enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User implements IUser {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  middleName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, default: ROLE.USER })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
