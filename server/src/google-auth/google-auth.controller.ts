import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import { ServiceType } from '@prisma/client';

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
  async googleAuthRedirect(@Request() req) {
    const token = await this.appService.googleLogin(req);
    console.log(token);
    console.log('actual', token.user.accessToken);

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
