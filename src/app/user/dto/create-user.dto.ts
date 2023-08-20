import { ROLE } from './../../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IUser } from '../types/user.interface';

export class CreateUserDto implements IUser {
  @ApiProperty({ example: 'John' })
  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'John' })
  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'John' })
  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ example: 'Google123' })
  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user' })
  @IsEnum(ROLE)
  @IsNotEmpty()
  role: ROLE;
}
