import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import * as authExceptions from '../../exceptions/authException';
import * as systemExceptions from '../../exceptions/systemException';
import * as argon2 from 'argon2';
import { getAuth } from 'firebase-admin/auth';
import { ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { PasswordResetDto } from './dto/password-reset.dto';

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
    const { email, password } = loginDto;
    // Call the auth service to perform login

    const result = await this.authService.getUser(email);

    if (!result) {
      throw authExceptions.incorrectUsernamePassword({ email, password });
    }
    // get the email and validate with firebase

    const verifiedBool = await argon2.verify(result.password, password);
    if (!verifiedBool) throw authExceptions.incorrectUsernamePassword();

    const customGoogleToken = await getAuth().createCustomToken(result.email);

    const { id, userName, userType } = result;

    return {
      user: {
        id,
        userName,
        email,
        userType,
      },
      token: customGoogleToken,
    };
  }

  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Check Firebase Auth for existing email
    try {
      const existingFirebaseUser = await getAuth().getUserByEmail(
        registerDto.email,
      );

      // If found, assume registration should not proceed
      if (existingFirebaseUser) {
        throw authExceptions.userAlreadyExists;
      }
    } catch (error) {
      // If user not found in Firebase, continue registration
      if (error.code !== 'auth/user-not-found') {
        // Unexpected Firebase error
        throw systemExceptions.userAlreadyExists(
          'Firebase error: ' + error.message,
        );
      }
    }
    // Check if user already exists
    const existingUser = await this.authService.getUser(registerDto.email);
    if (existingUser) {
      throw authExceptions.userAlreadyExists;
    }

    // Hash the password
    const hashedPassword = await argon2.hash(registerDto.password);

    // Create the user
    const newUser = await this.authService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    try {
      await getAuth().createUser({
        email: newUser.email,
        password: registerDto.password,
        displayName: newUser.userName,
      });
    } catch (error) {
      await this.authService.deleteUser(newUser.id);
    }

    return { message: true };
  }

  @ApiBody({ type: PasswordResetDto, description: 'Reset password data' })
  @Post('reset-password')
  async resetPassword(@Body() payload: PasswordResetDto) {
    // Handle password reset logic here
    const { email } = payload;
    // Call the auth service to perform password reset
    const user = await this.authService.getUser(email);
    if (!user) {
      throw authExceptions.userNotFound({ email });
    }
    try {
    } catch (error) {
      throw error;
    }
  }
}
