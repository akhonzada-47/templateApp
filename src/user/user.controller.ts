import {
  Body,
  Controller,
  UseGuards,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUserDto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' })
  getUserById(@Param('id') userId: string): Promise<any> {
    return this.UserService.getUserById(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAllUser() {
    return this.UserService.getAllUser();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update user password by Id' })
  updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.UserService.updateUserPassword(userId, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by Id' })
  deleteUser(@Param('id') userId: string): Promise<any> {
    return this.UserService.deleteUser(userId);
  }
}
