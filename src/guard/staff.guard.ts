import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as authException from '../exceptions/authException';
import { getAuth } from 'firebase-admin/auth';
import { AuthUserType } from '../constants/system';

@Injectable()
export default class StaffGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization)
      throw new UnauthorizedException('Missing authorization header');

    const tokenList: string[] = request.headers.authorization.split(' ');
    const token: string = tokenList?.[1];

    try {
      const userData = await getAuth().verifyIdToken(token, false);

      // if (userData.userType !== AuthUserType.STAFF) {
      //   throw new ForbiddenException('User is not staff');
      // }

      // Attach user data to request for later use
      request.user = userData;

      return true;
    } catch (err: any) {
      // Catch Firebase token errors
      if (err.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('Token expired');
      }
      if (err.code === 'auth/argument-error') {
        throw new UnauthorizedException('Invalid token');
      }

      // All other errors
      throw new ForbiddenException('Access denied');
    }
  }
}
