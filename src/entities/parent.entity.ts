import { Entity, Column } from 'typeorm';
import { Base } from './base';
import { ApiProperty } from '@nestjs/swagger';
import { PARENT_RELATION } from '../interfaces/system';

@Entity('parents')
export default class Parent extends Base {
  @ApiProperty({ example: 'Jane Doe' })
  @Column({ type: 'text' })
  motherName: string;

  @ApiProperty({ example: 'John Doe' })
  @Column({ type: 'text' })
  fatherName: string;

  @ApiProperty({ example: 'John Doe' })
  @Column({ type: 'text' })
  guardianName: string;

  @ApiProperty({ example: 'parent@example.com' })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @Column({ type: 'text' })
  phone: string;

  @ApiProperty({ example: 'Engineer', required: false })
  @Column({ type: 'varchar', nullable: true })
  occupation?: string;

  @ApiProperty({ example: 'New York' })
  @Column({ type: 'text' })
  city: string;

  @ApiProperty({ example: '123 Main St, New York, NY' })
  @Column({ type: 'text' })
  fullAddress: string;

  @ApiProperty({ enum: PARENT_RELATION, example: PARENT_RELATION.FATHER })
  @Column({ type: 'varchar' })
  relation: PARENT_RELATION;
}
