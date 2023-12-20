import { Controller, Get, Param } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller(':token/')
export class ActionController {
    constructor(private authService: ActionService) {}

    @Get('actions')
    getActions(@Param('token') token: string) {
      return this.authService.getActions(token);
    }
}
