import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { SpotifyOauthGuard } from './spotify-oauth.guard';
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
  async spotifyAuthRedirect(@Request() req: any, @Res() response: any) {
    this.authService.handleSpotifyAuthCallback(req, response);
  }
}
