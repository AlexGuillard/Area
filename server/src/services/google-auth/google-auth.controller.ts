import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller('myauth')
export class GoogleAuthController {
  constructor(
    private readonly appService: GoogleAuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {} // eslint-disable-line

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    summary: 'Google Auth Redirect',
  })
  async googleAuthRedirect(@Request() req: any, @Res() res: any) {
    this.appService.googleLogin(req, res);
  }
}
