import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  avatarUrl: string;

  // lat;lng
  @IsString()
  @Contains(';')
  location: string;
}
