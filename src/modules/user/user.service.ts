import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { User } from '../../entities/users.entity';
import { getAuth } from 'firebase-admin/auth';
import { CreateUserDto } from './dto/createUser.dto';
import * as authExceptions from '../../exceptions/authException';
import * as systemExceptions from '../../exceptions/systemException';
import * as userExceptions from '../../exceptions/userExceptions';

import * as argon2 from 'argon2';

interface FetchUsersDto {
  email?: string;
  userName?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async fetchUsers({
    email = '',
    userName = '',
    page = 1,
    limit = 10,
  }: FetchUsersDto) {
    const where: FindOptionsWhere<User> = {};
    if (email) where.email = Like(`%${email}%`);
    if (userName) where.userName = Like(`%${userName}%`);

    const [users, total] = await this.userRepository.findAndCount({
      where,
      select: {
        id: true,
        userName: true,
        userType: true,
        email: true,
        createdAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      total,
      page,
      limit,
    };
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(userDto: CreateUserDto) {
    // Check Firebase Auth for existing email
    try {
      const existingFirebaseUser = await getAuth().getUserByEmail(
        userDto.email,
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
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: string, userDto: Partial<User>) {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw userExceptions.UserNotFound; // Your custom error
    }

    // Lookup Firebase user by email
    let firebaseUser;
    try {
      firebaseUser = await getAuth().getUserByEmail(existingUser.email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw userExceptions.FirebaseUserNotFound; // Optional: Your own error
      }
      throw new Error(`Failed to fetch Firebase user: ${error.message}`);
    }

    const updateFirebaseData: any = {};

    if (userDto.email && userDto.email !== existingUser.email) {
      updateFirebaseData.email = userDto.email;
    }

    if (userDto.userName && userDto.userName !== existingUser.userName) {
      updateFirebaseData.displayName = userDto.userName;
    }

    if (userDto.password) {
      updateFirebaseData.password = userDto.password;
    }

    if (Object.keys(updateFirebaseData).length) {
      try {
        await getAuth().updateUser(firebaseUser.uid, updateFirebaseData);
      } catch (error) {
        // Fallback if no exception helper exists
        throw new Error(`Firebase update failed: ${error.message}`);
      }
    }

    // Hash password before saving
    if (userDto.password) {
      userDto.password = await argon2.hash(userDto.password);
    }

    await this.userRepository.update(id, userDto);
    return this.getUserById(id);
  }

  async deleteUser(id: string) {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw userExceptions.UserNotFound; // Custom exception
    }

    // Delete Firebase user (by email lookup)
    try {
      const firebaseUser = await getAuth().getUserByEmail(existingUser.email);
      await getAuth().deleteUser(firebaseUser.uid);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Firebase user already deleted, proceed
      } else {
        throw new Error(`Failed to delete Firebase user: ${error.message}`);
      }
    }

    // Delete from local DB
    await this.userRepository.delete(id);

    return { deleted: true };
  }
}
