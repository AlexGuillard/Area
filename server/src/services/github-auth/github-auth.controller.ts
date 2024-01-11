import { Controller, Get, Request, UseGuards, Res } from '@nestjs/common';  
import { AuthGuard } from '@nestjs/passport';
import { GithubAuthService } from './github-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('services')
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
  async authCallback(@Request() req: any, @Res() res: any) {
    this.githubAuthService.handleGithubAuthCallback(req, res);
  }
}
