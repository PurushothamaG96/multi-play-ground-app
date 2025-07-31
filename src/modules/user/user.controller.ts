import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with optional filters' })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'userName', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  fetchUsers(
    @Query('email') email?: string,
    @Query('userName') userName?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.userService.fetchUsers({ email, userName, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User deleted' })
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
