import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Base } from './base';
import Parent from './parent.entity';
import Student from './student.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('parentStudent')
@Unique(['student']) // Enforces 1-to-1: studentId is unique
export default class ParentStudent extends Base {
  @ApiProperty({
    name: 'parentId',
    type: 'string',
  })
  parentId: string;

  @ApiProperty({
    name: 'studentId',
    type: 'string',
  })
  studentId: string;

  @ApiProperty({ type: () => Parent })
  @ManyToOne(() => Parent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: Parent;

  @ApiProperty({ type: () => Student })
  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
