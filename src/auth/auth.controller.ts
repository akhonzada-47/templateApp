import { Body, Controller, Post} from "@nestjs/common";
import { LoginUserDto } from "../user/dtos/loginUserDto";
import { CreateUserDto } from '../user/dtos/createUserDto';
import { AuthService } from "./auth.service";
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signUp")
  @ApiOperation({ summary: 'Create User' })
  signUp(@Body() createUser: CreateUserDto): Promise<any> {
    return this.authService.createUser(createUser);
  }

  @Post("login")  
  @ApiOperation({ summary: 'LogIn User' })
  async validateUser(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    const validate = await this.authService.validateUser(loginUserDto);
    return validate;
  }
}