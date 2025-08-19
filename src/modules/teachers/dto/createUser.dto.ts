import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { USER_TYPE } from 'src/interfaces/user';

export class CreateUserDto {
  @ApiProperty({
    name: 'userName',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'fullAddress',
    type: 'string',
  })
  @IsString()
  fullAddress: string;

  @ApiProperty({
    name: 'city',
    type: 'string',
  })
  @IsString()
  city: string;

  @ApiProperty({
    name: 'phone',
    type: 'string',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    name: 'userType',
    type: 'number',
    enum: USER_TYPE,
  })
  @IsEnum(USER_TYPE)
  userType: number;
}
