import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateParentDto,
  UpdateParentDto,
  CreateStudentDto,
  UpdateStudentDto,
} from './dto';
import Parent from '../../entities/parent.entity';
import Student from '../../entities/student.entity';

@Injectable()
export class ParentStudentService {
  constructor(
    @InjectRepository(Parent) private readonly parentRepo: Repository<Parent>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  // PARENT CRUD
  async createParent(dto: CreateParentDto): Promise<Parent> {
    return await this.parentRepo.save(dto);
  }

  async getParents(): Promise<Parent[]> {
    return await this.parentRepo.find();
  }

  async getParent(id: string) {
    const parent = await this.parentRepo.findOneBy({ id });
    if (!parent) throw new NotFoundException('Parent not found');
    return parent;
  }

  async updateParent(id: string, dto: UpdateParentDto) {
    await this.parentRepo.update(id, dto);
    return this.getParent(id);
  }

  deleteParent(id: string) {
    return this.parentRepo.delete(id);
  }

  // STUDENT CRUD
  createStudent(dto: CreateStudentDto) {
    return this.studentRepo.save(dto);
  }

  async getStudent(id: string) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async updateStudent(id: string, dto: UpdateStudentDto) {
    await this.studentRepo.update(id, dto);
    return this.getStudent(id);
  }

  deleteStudent(id: string) {
    return this.studentRepo.delete(id);
  }
}
