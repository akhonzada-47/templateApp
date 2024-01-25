import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @ApiProperty()
  @IsString()
  @Length(5, 127)
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  password: string;
}
