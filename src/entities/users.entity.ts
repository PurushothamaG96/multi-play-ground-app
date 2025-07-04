import { Entity, Column } from 'typeorm';
import { Base } from './base';
import { ApiProperty } from '@nestjs/swagger';
import { USER_TYPE } from '../interfaces/user';

@Entity('users')
export class User extends Base {
  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'email123@gmail.com',
  })
  @Column({ unique: true, type: 'text' })
  email: string;

  @ApiProperty({
    name: 'userName',
    type: 'string',
    example: 'John rambo',
  })
  @Column({ name: 'userName', type: 'text', nullable: true })
  userName: string;


  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'ccjhqccjhgchghcfcvcv1wyttgc',
  })
  @Column({ name: 'password', type: 'text', nullable: true })
  password: string;

  @ApiProperty({
    name: 'userType',
    type: 'number',
    enum: USER_TYPE,
    default: USER_TYPE.STUDENT,
    example: USER_TYPE.STUDENT,
  })
  @Column({ name: 'userType', type: 'int' })
  userType: number;
}
