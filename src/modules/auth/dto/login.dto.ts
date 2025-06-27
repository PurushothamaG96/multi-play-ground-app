import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    name: 'username',
    type: 'string',
    example: 'client@gmail.com',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'testpassword',
    required: true,
  })
  password: string;

  @IsString()
  @ApiProperty({
    name: 'captchaToken',
    type: 'string',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmM',
    required: true,
  })
  captchaToken: string;
}
