import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import { ServiceType } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';

@Controller('myauth')
export class GoogleAuthController {
  constructor(
    private readonly appService: GoogleAuthService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {} // eslint-disable-line

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    summary: 'Google Auth Redirect',
  })
  async googleAuthRedirect(@Request() req) {
    const token = await this.appService.googleLogin(req);

    const user = await this.prisma.user.findUnique({
      where: {
        email: token.user.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('mail not found');
    }

    await this.prisma.services.create({
      data: {
        token: token.user.accessToken,
        typeService: ServiceType.GOOGLE,
        userId: user.id,
      },
    });

    return token;
  }
}
