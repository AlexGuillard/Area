import { Request, Injectable, Res } from '@nestjs/common';
import { ServiceType } from '@prisma/client';

@Injectable()
export class GoogleAuthService {
  async googleLogin(@Request() req: any, @Res() response: any) {
    try {
      const accessToken = req.user.accessToken;
      const refreshToken = req.user.refreshToken;

      response.cookie('tokenService', accessToken);
      response.cookie('RefreshToken', refreshToken);
      response.cookie('ServiceType', ServiceType.GOOGLE);
      response.redirect(`${process.env.WEB_URL}/ServicesConnexion`);
    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
      response.redirect(`${process.env.WEB_URL}/Area`);
    }
  }
}
