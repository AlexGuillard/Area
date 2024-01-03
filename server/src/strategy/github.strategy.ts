import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
      scope: ['public_profile', 'repo'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return {...profile, accessToken};
  }
}
