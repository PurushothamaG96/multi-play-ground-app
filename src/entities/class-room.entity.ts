import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base';
import { ApiProperty } from '@nestjs/swagger';
import ClassRoomYear from './class-room-year.entity';

@Entity('classRooms')
export default class ClassRoom extends Base {
  @ApiProperty({ example: 'Class 10-A' })
  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => ClassRoomYear, (crYear) => crYear.classRoom)
  classRoomYears: ClassRoomYear[];
}
