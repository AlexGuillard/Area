import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubDto } from './dto/github.dto';

@Controller('auth')
export class GithubAuthController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    // initiates the GitHub OAuth2 login flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res() res) {
    const user = req.user;

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

    console.log('GitHub User Data:', githubOAuthDto);

    return res.redirect('http://localhost:8081/Area');
  }
}