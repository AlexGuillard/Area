import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  async googleLogin(req) {
    if (!req.user) {
      throw new ForbiddenException('No user from google');
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
