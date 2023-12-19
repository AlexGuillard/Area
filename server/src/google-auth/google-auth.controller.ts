import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';

@Controller('myauth')
export class GoogleAuthController {
  constructor(private readonly appService: GoogleAuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    const token = this.appService.googleLogin(req);
    console.log(token);
    return token;
  }
}