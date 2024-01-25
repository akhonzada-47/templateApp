import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUser() {
    const user = await this.prismaService.user.findMany();
    return user;
  }

  async getUserById(userId: string) {
    const userIdInt = parseInt(userId, 10);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userIdInt,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async updateUserPassword(userId: number, updateUserDto: UpdateUserDto) {
    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          password: await bcrypt.hash(updateUserDto.password, 10),
        },
      });

      return { message: 'User updated successfully' };
    } catch (err) {
      throw err.message;
    }
  }

  async deleteUser(userId: string) {
    try {
      const userIdInt = parseInt(userId, 10);

      await this.prismaService.user.delete({
        where: {
          id: userIdInt,
        },
      });

      return { message: 'User deleted successfully' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async validateUser(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    let user: User;
    if (!credentials.email) {
      throw new BadRequestException('Must provide either email');
    }
    if (
      credentials.email &&
      credentials.email !== null &&
      credentials.email !== undefined
    ) {
      user = await this.findUserByEmail(credentials.email);
      if (!user) {
        throw new NotFoundException('Email is incorrect');
      }
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password is incorrect');
      }
    }
    return user;
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
