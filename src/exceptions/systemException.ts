import { HttpStatus } from '@nestjs/common';

import CustomHttpException from '../utilities/customHttpException';

export const userAlreadyExists = (payload = {}) =>
  new CustomHttpException(
    'Internal Server Error',
    HttpStatus.BAD_REQUEST,
    payload,
  );
