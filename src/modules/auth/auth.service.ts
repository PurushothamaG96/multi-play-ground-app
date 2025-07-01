import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Assuming you have a User repository
  ) {}

  public async getUser(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          isActive: true,
          isArchived: false,
          email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async createUser(registerDto: RegisterDto): Promise<User> {
    try {
      const user = this.userRepository.create(registerDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to register user');
    }
  }
}
