import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
    const { user }: { user: Profile } = req;

    console.log('my super user', user);

    if (!user) {
      res.redirect('/');
      return;
    }

    try {
      await this.authService.handleSpotifyAuthCallback(user);
      return res.redirect(`${process.env.WEB_URL}/Area`);
    } catch (error) {
      throw error;
    }

  }
}
