import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @Length(5, 127)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 255)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(8, 255)
  confirmPassword: string;
}
