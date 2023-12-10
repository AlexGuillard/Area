import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUpObject(@Body() params: AuthDto) {
      return this.authService.signUp(params);
    }
    @Post('signin')
    signIn(@Body() params: AuthDto) {
        return this.authService.signIn(params);
    }
}
