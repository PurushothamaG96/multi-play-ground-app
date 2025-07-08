import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import  ClassRoom  from './class-room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('classRoomYears')
export default class ClassRoomYear extends Base {
  @ApiProperty({ example: 2024 })
  @Column({ type: 'int' })
  year: number;

  @ApiProperty({
    name: 'classRoomId',
    type: 'string',
  })
  classRoomId: string;

  @ApiProperty({ type: () => ClassRoom })
  @ManyToOne(() => ClassRoom, (cr) => cr.classRoomYears, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classRoomId' })
  classRoom: ClassRoom;
}
