import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

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
