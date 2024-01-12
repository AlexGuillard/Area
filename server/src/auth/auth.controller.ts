import { Body, Controller, ForbiddenException, Post, Headers, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from './dto';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
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
  @ApiOperation({
    summary: 'register to application with mail and password',
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
  @ApiOperation({
    summary: 'login to application with mail and password',
  })
  signIn(@Body() params: AuthDto) {
    return this.authService.signIn(params);
  }
  @Delete('delete')
  @ApiHeader({
    name: 'token',
    required: true,
    description: 'Token of the user',
  })
  deleteUser(@Headers('token') token: string) {
    return this.authService.deleteUser(token);
  }

  @Post('signout')
  @ApiHeader({
    name: 'token',
    required: true,
    description: 'Token of the user',
  })
  signOut(@Headers('token') token: string) {
    return this.authService.signOut(token);
  }

  @Post('loginservice')
  @ApiBody({
    type: AuthDto,
    required: true,
    examples: {
      basicExample: {
        value: { token: 'yourtoken' },
      },
    },
  })
  @ApiOperation({
    summary: 'connect to application with google account',
  })
  async loginService(@Body() token: TokenDto): Promise<any> {
    try {
      const userData = await this.authService.loginService(token.token);
      return userData;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Invalid Google token');
    }
  }
}
