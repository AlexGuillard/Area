import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';  
import { AuthGuard } from '@nestjs/passport';
import { GithubAuthService } from './github-auth.service';

@Controller('auth/github')
export class GithubAuthController {
  constructor(
    private readonly githubAuthService: GithubAuthService
  ) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    // initiates the GitHub OAuth2 login flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res() res) {
    const user = req.user;

    try {
      await this.githubAuthService.handleGithubAuthCallback(user);
      return res.redirect('http://localhost:8081/Area');
    } catch (error) {
      throw error;
    }
  }
}
