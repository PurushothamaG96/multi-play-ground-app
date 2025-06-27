import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    // You can inject services here if needed
    private readonly authService: AuthService,
  ) {}

  //   This controller will handle authentication-related routes
  //   You can add methods here to handle login, registration, etc.
  //   For example:
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Handle login logic here
    const { username, password, captchaToken } = loginDto;
    // Call the auth service to perform login

    const result = await this.authService.getUser(loginDto);

    // get the email and validate with firebase
    
  }
}
