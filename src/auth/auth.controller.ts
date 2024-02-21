import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dtos/createUserDto';
import { LoginUserDto } from '../user/dtos/loginUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create User' })
  signUp(@Body() createUser: CreateUserDto): Promise<any> {
    return this.authService.createUser(createUser);
  }

  @Post('login')
  @ApiOperation({ summary: 'LogIn User' })
  async validateUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const validate = await this.authService.validateUser(loginUserDto);
    return validate;
  }
}
