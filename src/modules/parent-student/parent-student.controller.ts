// src/modules/parent-student/parent-student.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ParentStudentService } from './parent-student.service';
import {
  CreateParentDto,
  CreateStudentDto,
  UpdateParentDto,
  UpdateStudentDto,
} from './dto';
import Parent from '../../entities/parent.entity';
import Student from '../../entities/student.entity';
import StaffGuard from '../../guard/staff.guard';

@ApiBearerAuth()
@UseGuards(StaffGuard)
@ApiTags('Parent-Student Management')
@Controller('parent-student')
export class ParentStudentController {
  constructor(private readonly service: ParentStudentService) {}

  @Get('parents')
  @ApiOperation({ summary: 'Fetch Parents lists' })
  @ApiResponse({
    status: 200,
    description: 'Parent created',
    type: Parent,
    isArray: true,
  })
  getParents() {
    return this.service.getParents();
  }

  // PARENT CRUD
  @Post('parents')
  @ApiOperation({ summary: 'Create a parent' })
  @ApiBody({ type: CreateParentDto })
  @ApiResponse({ status: 201, description: 'Parent created', type: Parent })
  createParent(@Body() dto: CreateParentDto) {
    return this.service.createParent(dto);
  }

  @Get('parents/:id')
  @ApiOperation({ summary: 'Get parent by ID' })
  @ApiResponse({ status: 200, description: 'Parent found', type: Parent })
  getParent(@Param('id') id: string) {
    return this.service.getParent(id);
  }

  @Put('parents/:id')
  @ApiOperation({ summary: 'Update parent' })
  @ApiBody({ type: UpdateParentDto })
  @ApiResponse({ status: 200, description: 'Parent updated', type: Parent })
  updateParent(@Param('id') id: string, @Body() dto: UpdateParentDto) {
    return this.service.updateParent(id, dto);
  }

  @Delete('parents/:id')
  @ApiOperation({ summary: 'Delete parent' })
  @ApiResponse({ status: 200, description: 'Parent deleted' })
  deleteParent(@Param('id') id: string) {
    return this.service.deleteParent(id);
  }

  // STUDENT CRUD
  @Post('students')
  @ApiOperation({ summary: 'Create a student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created', type: Student })
  createStudent(@Body() dto: CreateStudentDto) {
    return this.service.createStudent(dto);
  }

  @Get('students/:id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, description: 'Student found', type: Student })
  getStudent(@Param('id') id: string) {
    return this.service.getStudent(id);
  }

  @Put('students/:id')
  @ApiOperation({ summary: 'Update student' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated', type: Student })
  updateStudent(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.service.updateStudent(id, dto);
  }

  @Delete('students/:id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 200, description: 'Student deleted' })
  deleteStudent(@Param('id') id: string) {
    return this.service.deleteStudent(id);
  }
}
