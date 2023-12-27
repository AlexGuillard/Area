import { Controller, Get, Req, UseGuards, Res, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubDto } from './dto/github.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceType } from '@prisma/client';

@Controller('auth/github')
export class GithubAuthController {
  constructor(
    private prisma: PrismaService,
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

    const userDB = await this.prisma.user.findUnique({
      where: {
        email: githubOAuthDto._json.email,
      },
    });

    if (!userDB) {
      throw new ForbiddenException('mail not found while creating Github service');
    }

    await this.prisma.services.create({
      data: {
        token: githubOAuthDto.accessToken,
        typeService: ServiceType.GITHUB,
        userId: userDB.id,
      },
    });

    return res.redirect('http://localhost:8081/Area');
  }
}