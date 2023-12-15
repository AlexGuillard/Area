import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiBody } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({
    type: AuthDto,
    required: true,
    examples: {
      basicExample: {
        value: { mail: 'mail@gmail.com', password: 'passwordUser' },
      },
      basicError: {
        value: { mail: 'mail', password: 'passwordUser' },
      },
    },
  })
  signUp(@Body() params: AuthDto) {
    return this.authService.signUp(params);
  }
  @Post('signin')
  @ApiBody({
    type: AuthDto,
    required: true,
    examples: {
      basicExample: {
        value: { mail: 'mail@gmail.com', password: 'passwordUser' },
      },
      basicError: {
        value: { mail: 'mail', password: 'passwordUser' },
      },
    },
  })
  signIn(@Body() params: AuthDto) {
    return this.authService.signIn(params);
  }

  @Post('/loginService')
  async loginService(
    @Body('token') token
  ): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    console.log(ticket.getPayload());
    return {
      success: true
    };
  }
}
