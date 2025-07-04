import { HttpStatus } from '@nestjs/common';

import CustomHttpException from '../utilities/customHttpException';

export const internalServerErrorException = (payload = {}) =>
  new CustomHttpException(
    'Internal Server Error',
    HttpStatus.INTERNAL_SERVER_ERROR,
    payload,
  );
