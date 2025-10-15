import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class PasswordResetDto {
  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'abc@gmail.com',
  })
  @IsEmail()
  email: string;
}
