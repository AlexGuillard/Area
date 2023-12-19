import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionService } from './action.service';
import { AreaDto } from './dto';

@Controller(':token/')
export class ActionController {
    constructor(private authService: ActionService) {}

    @Get('actions')
    getActions(@Param('token') token: string) {
      return this.authService.getActions(token);
    }
    @Get('action')
    getTime(@Param('token') token: string) {
      return this.authService.findAll();
    }
    @Post('area')
    newAction(@Param('token') token: string, @Body() body: AreaDto) {
      // return this.authService.registerArea(token, body);
    }
}
