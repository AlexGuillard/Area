import { Injectable } from '@nestjs/common';
import { UserTokenService } from 'src/user-token/user-token.service';

@Injectable()
export class GoogleAuthService {

  constructor(private readonly userTokenService: UserTokenService) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    // const { id: userId, accessToken, refreshToken } = req.user;
    // await this.userTokenService.saveGoogleToken(userId, accessToken, refreshToken);

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}