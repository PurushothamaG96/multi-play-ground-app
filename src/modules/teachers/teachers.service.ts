import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import Staff from '../../entities/staff.entity';

interface FetchTeachersDto {
  name?: string;
  email?: string;
  city?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async fetchTeachers({
    name = '',
    email = '',
    city = '',
    page = 1,
    limit = 10,
  }: FetchTeachersDto) {
    const where: FindOptionsWhere<Staff> = {};
    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (city) where.city = Like(`%${city}%`);

    const [teachers, total] = await this.staffRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data: teachers, total, page, limit };
  }

  async getTeacherById(id: string): Promise<Staff | null> {
    const teacher = await this.staffRepository.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async createTeacher(staffDto: Partial<Staff>): Promise<Staff> {
    const teacher = this.staffRepository.create(staffDto);
    return this.staffRepository.save(teacher);
  }

  async updateTeacher(
    id: string,
    staffDto: Partial<Staff>,
  ): Promise<Staff | null> {
    const teacher = await this.staffRepository.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.staffRepository.update(id, staffDto);
    return this.getTeacherById(id);
  }

  async deleteTeacher(id: string) {
    const existing = await this.staffRepository.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Teacher not found');
    await this.staffRepository.delete(id);
    return { deleted: true };
  }
}
