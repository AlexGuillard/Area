import { Controller, ForbiddenException, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SpotifyOauthGuard } from './spotify-oauth.guard';
import { Profile } from 'passport-spotify';
import { SpotifyAuthService } from './spotify-auth.service';

@Controller('auth/spotify')
export class SpotifyAuthController {
  constructor(private readonly authService: SpotifyAuthService) {}

  @UseGuards(SpotifyOauthGuard)
  @Get()
  login(): void {
    // initiates the Spotify OAuth2 login flow
    return;
  }

  @UseGuards(SpotifyOauthGuard)
  @Get('redirect')
  async spotifyAuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const {
      user,
      authInfo,
    }: { 
      user: Profile,
      authInfo: {
        accessToken: string,
        refreshToken: string,
        expires_in: number,
      }
    } = req;

    if (!user) {
      throw new ForbiddenException('mail not found while creating Google service');
    }

    try {
      await this.authService.handleSpotifyAuthCallback(user, authInfo);
      return res.redirect(`${process.env.WEB_URL}/Area`);
    } catch (error) {
      throw error;
    }
  }
}
