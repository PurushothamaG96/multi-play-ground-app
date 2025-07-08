// src/modules/parent-student/dto/index.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsUUID,
  IsInt,
} from 'class-validator';
import { GENDER, PARENT_RELATION } from '../../../interfaces/system';

// --- PARENT DTOs ---
export class CreateParentDto {
  @ApiProperty() @IsString() motherName: string;
  @ApiProperty() @IsString() fatherName: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() phone: string;
  @ApiProperty() @IsOptional() @IsString() occupation?: string;
  @ApiProperty() @IsString() city: string;
  @ApiProperty() @IsString() fullAddress: string;
  @ApiProperty({ enum: PARENT_RELATION })
  @IsEnum(PARENT_RELATION)
  relation: PARENT_RELATION;
}

export class UpdateParentDto extends CreateParentDto {}

// --- STUDENT DTOs ---
export class CreateStudentDto {
  @ApiProperty() @IsUUID() parentId: string;
  @ApiProperty() @IsString() firstName: string;
  @ApiProperty() @IsString() middleName: string;
  @ApiProperty() @IsString() lastName: string;
  @ApiProperty({ enum: GENDER }) @IsEnum(GENDER) gender: GENDER;
}

export class UpdateStudentDto extends CreateStudentDto {}
