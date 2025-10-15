import { HttpStatus } from '@nestjs/common';

import CustomHttpException from '../utilities/customHttpException';

export const forbidden = new CustomHttpException(
  'Forbidden',
  HttpStatus.FORBIDDEN,
);

export const unauthorized = new CustomHttpException(
  'Unauthorized',
  HttpStatus.UNAUTHORIZED,
);

export const clientNotFound = new CustomHttpException(
  'User not found',
  HttpStatus.NOT_FOUND,
);

export const userAlreadyExists = new CustomHttpException(
  'User Already exist',
  HttpStatus.BAD_REQUEST,
);

export const clientCompleteOnboardingFlow = new CustomHttpException(
  'Please complete your onboarding before logging in.',
  HttpStatus.PRECONDITION_REQUIRED,
);

export const forbiddenFirebase = (message = 'Forbidden') =>
  new CustomHttpException(message, HttpStatus.FORBIDDEN);

export const incorrectUsernamePassword = (payload = {}) =>
  new CustomHttpException(
    'Incorrect username/password',
    HttpStatus.FORBIDDEN,
    payload,
  );

export const verificationCodeMismatch = (payload = {}) =>
  new CustomHttpException(
    'Incorrect verification code',
    HttpStatus.BAD_REQUEST,
    payload,
  );

export const invalidPhoneNumber = (payload = {}) =>
  new CustomHttpException(
    'Incorrect phone number',
    HttpStatus.BAD_REQUEST,
    payload,
  );

export const invalidToken = (payload = {}) =>
  new CustomHttpException('Invalid Token', HttpStatus.FORBIDDEN, payload);

export const userNotFound = (payload = {}) =>
  new CustomHttpException('User not found', HttpStatus.NOT_FOUND, payload);

export const invalidCredentials = (payload = {}) =>
  new CustomHttpException('Invalid Credentials', HttpStatus.FORBIDDEN, payload);
