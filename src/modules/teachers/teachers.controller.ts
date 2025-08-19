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
import { TeachersService } from './teachers.service';
import Staff from '../../entities/staff.entity';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Create teacher' })
  @ApiBody({ type: Staff })
  @ApiResponse({ status: 201, description: 'Teacher created', type: Staff })
  create(@Body() staffDto: Partial<Staff>) {
    return this.teachersService.createTeacher(staffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teachers with filters' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  fetchTeachers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('city') city?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.teachersService.fetchTeachers({ name, email, city, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get teacher by id' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update teacher by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Staff })
  update(@Param('id') id: string, @Body() staffDto: Partial<Staff>) {
    return this.teachersService.updateTeacher(id, staffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete teacher by id' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.teachersService.deleteTeacher(id);
  }
}
