import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentStudentController } from './parent-student.controller';
import { ParentStudentService } from './parent-student.service';
import Parent from '../../entities/parent.entity';
import Student from '../../entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, Student])],
  controllers: [ParentStudentController],
  providers: [ParentStudentService],
})
export class ParentStudentModule {}
