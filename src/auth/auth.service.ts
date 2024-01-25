import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from 'src/user/dtos/loginUserDto';
import { CreateUserDto } from '../user/dtos/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      password: user.password,
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.usersService.validateUser(loginUserDto);
    return this.login(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
    return createdUser;
  }
}
