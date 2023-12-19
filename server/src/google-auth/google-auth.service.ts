import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserTokenService } from 'src/user-token/user-token.service';
import { GoogleDto } from './dto/google.dto';

@Injectable()
export class GoogleAuthService {

  constructor(private readonly userTokenService: UserTokenService) {}

  async googleLogin(req) {
    if (!req.user) {
      throw new ForbiddenException('No user from google');
    }

    // const { id: userId, accessToken, refreshToken } = req.user;
    // await this.userTokenService.saveGoogleToken(userId, accessToken, refreshToken);

    // const infos = new GoogleDto();
    // infos.message = 'User information from google';
    // infos.user = req.user;

    // console.log(req);

    // return infos;


    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}