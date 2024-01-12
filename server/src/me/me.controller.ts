import { Controller, Get, Headers } from '@nestjs/common';
import { MeService } from './me.service';
import { ApiHeader } from '@nestjs/swagger';

@Controller('me')
export class MeController {
  constructor(private authService: MeService) {}

  @Get()
  @ApiHeader({
    name: 'token',
    required: true,
    description: 'Token of the user',
  })
  getMe(@Headers('token') token: string) {
    return this.authService.getMe(token);
  }
}
