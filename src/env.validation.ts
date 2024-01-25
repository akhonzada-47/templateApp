import { IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  JWT_SECRET: string;
}
