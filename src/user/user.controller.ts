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
import { UpdateUserPasswordDto } from './dtos/updateUserDto';
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
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<any> {
    return this.UserService.updateUserPassword(userId, updateUserPasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by Id' })
  deleteUser(@Param('id') userId: number): Promise<any> {
    return this.UserService.deleteUser(userId);
  }
}
