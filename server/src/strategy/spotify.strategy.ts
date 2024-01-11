import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-spotify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyOauthStrategy extends PassportStrategy(
  Strategy,
  'spotify',
) {
  constructor() {
    super(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/spotify/redirect`,
        scope:
          'user-read-private user-read-email playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-playback-state user-follow-modify user-follow-read user-library-modify',
      });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName } = profile;
    const user = {
      spotifyId: id,
      displayName,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
