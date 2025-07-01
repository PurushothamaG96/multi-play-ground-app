import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, isString, IsString } from 'class-validator';
import { USER_TYPE } from 'src/interfaces/user';

export class RegisterDto {
  @ApiProperty({
    name: 'userName',
    type: 'string',
    example: 'John Rambo',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'abc@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'anythingYouRemember',
  })
  @IsString()
  password: string;

  @ApiProperty({
    name: 'userType',
    enum: USER_TYPE,
  })
  @IsEnum(USER_TYPE)
  userType: number;
}
