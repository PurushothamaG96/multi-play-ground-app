import { Entity, Column } from 'typeorm';
import { Base } from './base';
import { ApiProperty } from '@nestjs/swagger';
import { USER_TYPE } from '../interfaces/user';

@Entity('staffs')
export default class Staff extends Base {
  @ApiProperty({ example: 'John Doe' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({ example: '+919999999999' })
  @Column({ type: 'text' })
  phone: string;

  @ApiProperty({ example: 'Chennai' })
  @Column({ type: 'text' })
  city: string;

  @ApiProperty({ example: '123 Gandhi Street, TN' })
  @Column({ type: 'text' })
  fullAddress: string;

  @ApiProperty({ enum: USER_TYPE, example: USER_TYPE.STAFF })
  @Column({ type: 'int' })
  userType: USER_TYPE;
}
