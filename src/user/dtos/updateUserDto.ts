import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsString()
  @Length(5, 127)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(5, 127)
  confirmPassword: string;
}
