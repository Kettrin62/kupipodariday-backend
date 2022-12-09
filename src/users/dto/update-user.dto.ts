import {
  Length,
  IsUrl,
  IsEmail,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}