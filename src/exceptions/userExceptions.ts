import { HttpStatus } from '@nestjs/common';
import CustomHttpException from 'src/utilities/customHttpException';

export const UserNotFound = new CustomHttpException(
  'User Not found',
  HttpStatus.NOT_FOUND,
);

export const FirebaseUserNotFound = new CustomHttpException(
  'User Not found',
  HttpStatus.NOT_FOUND,
);
