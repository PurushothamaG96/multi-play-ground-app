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

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        userName: true,
        email: true,
        userType: true,
      },
    });
  }

  // Create new user: DB + Firebase (with custom claims)
  async createUser(userDto: CreateUserDto): Promise<User> {
    // Check Firebase for existing user by email
    try {
      const existingFirebaseUser = await getAuth().getUserByEmail(
        userDto.email,
      );
      if (existingFirebaseUser) {
        throw authExceptions.userAlreadyExists;
      }
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        throw systemExceptions.userAlreadyExists('Firebase: ' + error.message);
      }
      // User not found - OK to proceed
    }

    // Hash the password
    const hashedPassword = await argon2.hash(userDto.password);

    // Save user to your DB
    const user = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);

    // Add user to Firebase Auth
    let firebaseUser;
    try {
      firebaseUser = await getAuth().createUser({
        email: savedUser.email,
        password: userDto.password,
        displayName: savedUser.userName,
      });
    } catch (error: any) {
      throw systemExceptions.userAlreadyExists(
        'Firebase createUser: ' + error.message,
      );
    }

    // Set custom claim for userType
    try {
      await getAuth().setCustomUserClaims(firebaseUser.uid, {
        userType: savedUser.userType,
      });
    } catch (error: any) {
      throw new Error(`Failed to set Firebase custom claims: ${error.message}`);
    }

    return savedUser;
  }

  // Update user: DB + Firebase (and custom claims if userType changed)
  async updateUser(id: string, userDto: Partial<User>): Promise<User | null> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw userExceptions.UserNotFound;
    }

    // Lookup Firebase user by previous email
    let firebaseUser;
    try {
      firebaseUser = await getAuth().getUserByEmail(existingUser.email);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw userExceptions.FirebaseUserNotFound;
      }
      throw new Error(`Failed to fetch Firebase user: ${error.message}`);
    }

    // Prepare Firebase update
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
    // Apply changes to Firebase User
    if (Object.keys(updateFirebaseData).length) {
      try {
        await getAuth().updateUser(firebaseUser.uid, updateFirebaseData);
      } catch (error: any) {
        throw new Error(`Firebase update failed: ${error.message}`);
      }
    }

    // If userType changed, set custom claim (even if not changed, you can refresh claim here)
    if (userDto.userType && userDto.userType !== existingUser.userType) {
      try {
        await getAuth().setCustomUserClaims(firebaseUser.uid, {
          userType: userDto.userType,
        });
      } catch (error: any) {
        throw new Error(
          `Failed to update Firebase custom claims: ${error.message}`,
        );
      }
    }

    // Hash password before saving in local DB
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
