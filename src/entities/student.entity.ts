import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import Parent from './parent.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '../interfaces/system';

@Entity('students')
export default class Student extends Base {
  @ApiProperty({ example: 'uuid' })
  @Column({ type: 'uuid' })
  parentId: string;

  @ApiProperty({ example: 'uuid-of-parent' })
  @ManyToOne(() => Parent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: Parent;

  @ApiProperty({ example: 'Ravi' })
  @Column({ type: 'text' })
  firstName: string;

  @ApiProperty({ example: 'Kumar' })
  @Column({ type: 'text' })
  middleName: string;

  @ApiProperty({ example: 'Sharma' })
  @Column({ type: 'text' })
  lastName: string;

  @ApiProperty({ enum: GENDER, example: GENDER.MALE })
  @Column({ type: 'int' })
  gender: GENDER;
}
