import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import {
  CreateParentDto,
  UpdateParentDto,
  CreateStudentDto,
  UpdateStudentDto,
} from './dto';
import Parent from '../../entities/parent.entity';
import Student from '../../entities/student.entity';

interface fetchStudentsDto {
  name?: string;
  email?: string;
  city?: string;
  page?: number;
  limit?: number;
}

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

  async fetchStudents({
    name = '',
    email = '',
    city = '',
    page = 1,
    limit = 10,
  }: fetchStudentsDto) {
    const qb = this.studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.parent', 'parent');

    if (name) {
      qb.andWhere(
        'student.firstName ILIKE :name OR student.lastName ILIKE :name',
        {
          name: `%${name}%`,
        },
      );
    }

    if (email) {
      qb.andWhere('parent.email ILIKE :email', { email: `%${email}%` });
    }

    if (city) {
      qb.andWhere('parent.city ILIKE :city', { city: `%${city}%` });
    }

    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy('student.createdAt', 'DESC');

    const [students, total] = await qb.getManyAndCount();

    return { data: students, total, page, limit };
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

  async createStudent(dto: CreateStudentDto) {
    // 1. Check if parent exists (by phone or email)
    let parent = await this.parentRepo.findOne({
      where: [{ phone: dto.parent.phone }, { email: dto.parent.email }],
    });

    // 2. If not found, create new parent
    if (!parent) {
      parent = await this.parentRepo.save(dto.parent);
    }

    // 3. Create the student
    const student = await this.studentRepo.save(
      this.studentRepo.create({
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        gender: dto.gender,
        parentId: parent.id,
      }),
    );

    return student;
  }

  async getStudent(id: string) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['parentStudent', 'parentStudent.parent'],
    });
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
