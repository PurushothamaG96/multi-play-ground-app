import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'client@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'testpassword',
    required: true,
  })
  password: string;

//   @ApiProperty({
//     name: 'captchaToken',
//     type: 'string',
//     example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmM',
//     required: true,
//   })
//   @IsOptional()
//   @IsString()
//   captchaToken: string;
}
