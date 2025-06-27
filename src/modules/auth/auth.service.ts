import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Assuming you have a User repository
  ) {}

  public async getUser(body: LoginDto): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          isActive: true,
          isArchived: false,
          userName: body.username,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
