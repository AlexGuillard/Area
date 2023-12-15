import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiBody } from '@nestjs/swagger';

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
  async loginService(@Body('token') token): Promise<any> {
    try {
      const userData = await this.authService.loginService(token);
      return userData;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Invalid Google token');
    }
  }
}
