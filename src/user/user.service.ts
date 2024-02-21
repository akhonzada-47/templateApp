import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserPasswordDto } from './dtos/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private scheduleRegistry: SchedulerRegistry,
  ) {}

  async getAllUser(userid: number) {
    const user = await this.prismaService.user.findMany({
      where: {
        id: userid,
      },
    });
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

  async updateUserPassword(
    userId: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    if (
      updateUserPasswordDto.password !== updateUserPasswordDto.confirmPassword
    ) {
      throw new BadRequestException('New/Confirm Password doesnt match');
    }

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await bcrypt.hash(updateUserPasswordDto.password, 10),
      },
    });

    return { message: 'User is updated successfully' };
  }

  async deleteUser(userId: number) {
    try {
      await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });

      return { message: 'User is deleted successfully' };
    } catch (err) {
      throw new NotFoundException(`User with ID ${userId} not found`);
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
        throw new NotFoundException('Email not found');
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

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // triggerTask() {
  //   console.log('Hello, \nIm recurring after every 10 seconds');
  // }
}
