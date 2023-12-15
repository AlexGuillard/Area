import { Controller, Get, Param } from '@nestjs/common';
import { MeService } from './me.service';

@Controller(':token/')
export class MeController {
    constructor(private authService: MeService) {}

    @Get("me")
    getMe(@Param("token") token: string) {
        return this.authService.getMe(token);
    }
}
