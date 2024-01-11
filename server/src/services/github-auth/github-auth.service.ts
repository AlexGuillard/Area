import { Injectable, Res } from '@nestjs/common';
import { ServiceType } from '@prisma/client';
import { Request } from '@nestjs/common';
import { GithubDto } from './dto/github.dto';

@Injectable()
export class GithubAuthService {
  constructor() {}

  async handleGithubAuthCallback(@Request() req: any, @Res() response: any) {
    try {
      const accessToken = req.user.accessToken;
      const refreshToken = req.user.refreshToken;

      response.cookie('tokenService', accessToken);
      response.cookie('RefreshToken', refreshToken);
      response.cookie('ServiceType', ServiceType.GITHUB);
      response.redirect(`${process.env.WEB_URL}/ServicesConnexion`);
    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
      response.redirect(`${process.env.WEB_URL}/Area`);
    }
  }

  private mapToGithubDto(user: any): GithubDto {
    const githubOAuthDto = new GithubDto();
    githubOAuthDto.id = user.id;
    githubOAuthDto.displayName = user.displayName;
    githubOAuthDto.username = user.username;
    githubOAuthDto.profileUrl = user.profileUrl;
    githubOAuthDto.photos = user.photos;
    githubOAuthDto.provider = user.provider;
    githubOAuthDto._raw = user._raw;
    githubOAuthDto._json = user._json;
    githubOAuthDto.accessToken = user.accessToken;

    return githubOAuthDto;
  }
}
