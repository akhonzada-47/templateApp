import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard'; // Import your RolesGuard
import { UpdateUserPasswordDto } from './dtos/updateUserDto';
import { GetUser } from './get-user.decorator';
import { UserService } from './user.service';

@UseGuards(RolesGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Roles('User')
  @ApiBearerAuth()
  @Get('getUserById')
  @ApiOperation({ summary: 'Get user by Id' })
  getUserById(@Query('id') userId: string): Promise<any> {
    return this.UserService.getUserById(userId);
  }

  @Roles('User')
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAllUser(@GetUser() user) {
    return this.UserService.getAllUser(user.userId);
  }

  @Roles('User')
  @ApiBearerAuth()
  @Patch('updatePassword')
  @ApiOperation({ summary: 'Update user password by Id' })
  updateUser(
    @Query('id') userId: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<any> {
    return this.UserService.updateUserPassword(userId, updateUserPasswordDto);
  }

  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('deleteUser')
  @ApiOperation({ summary: 'Delete user by Id' })
  deleteUser(@Query('id') userId: number): Promise<any> {
    return this.UserService.deleteUser(userId);
  }
}
