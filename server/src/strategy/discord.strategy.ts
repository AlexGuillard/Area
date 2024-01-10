import { Injectable} from '@nestjs/common';
import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['email', 'guilds', 'bot'],
      Permissions: ['ADMINISTRATOR'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { email } = profile;
    const details = {
      email,
      accessToken,
      refreshToken,
    };
    return details;
  }
}
