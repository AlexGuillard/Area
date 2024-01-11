import { Injectable, Res, Request } from '@nestjs/common';
import { ServiceType } from '.prisma/client';

@Injectable()
export class SpotifyAuthService {
  constructor() {}

  async handleSpotifyAuthCallback(@Request() req: any, @Res() response: any) {
    try {
      const accessToken = req.user.accessToken;
      const refreshToken = req.user.refreshToken;

      response.cookie('tokenService', accessToken);
      response.cookie('RefreshToken', refreshToken);
      response.cookie('ServiceType', ServiceType.SPOTIFY);
      response.redirect(`${process.env.WEB_URL}/ServicesConnexion`);
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      response.status(500).send('Internal Server Error');
      response.redirect(`${process.env.WEB_URL}/Area`);
    }
  }
}
