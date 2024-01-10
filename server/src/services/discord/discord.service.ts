import { Injectable, Res } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { ServiceType } from '@prisma/client';

@Injectable()
export class DiscordService {
  constructor() {}

  async discordValidate(@Request() req: any, @Res() response: any) {
    try {
      const accessToken = req.user.accessToken;
      const refreshToken = req.user.refreshToken;

      response.cookie('tokenService', accessToken, { maxAge: 900000, httpOnly: true, sameSite: 'strict' });
      response.cookie('RefreshToken', refreshToken, { maxAge: 900000, httpOnly: true, sameSite: 'strict' });
      response.cookie('ServiceType', ServiceType.DISCORD, { maxAge: 900000, httpOnly: true, sameSite: 'strict' });
      response.redirect(`${process.env.WEB_URL}/ServicesConnexion`);
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  }
}
