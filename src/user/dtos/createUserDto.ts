import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}
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

  @ApiProperty()
  @IsString()
  @IsEnum(Role)
  role?: Role = Role.User;
}
