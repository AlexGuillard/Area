import { Controller, Get, Param } from '@nestjs/common';
import { MeService } from './me.service';
import { ApiParam } from '@nestjs/swagger';

@Controller(':token/')
export class MeController {
    constructor(private authService: MeService) {}

    @Get("me")
    @ApiParam({
        name: 'token',
        required: true,
        description: 'Token of the user',
    })
    getMe(@Param("token") token: string) {
        return this.authService.getMe(token);
    }
}
