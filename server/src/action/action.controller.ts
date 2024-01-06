import { Controller, Get, Param } from '@nestjs/common';
import { ActionService } from './action.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('actions')
@Controller(':token/')
export class ActionController {
  constructor(private authService: ActionService) {}

  @Get('actions')
  getActions(@Param('token') token: string) {
    return this.authService.getActions(token);
  }
  @Get('actions/:nameAction')
  getReactionInfo(@Param('token') token: string, @Param('nameAction') nameAction: string) {
    return this.authService.getActionInfo(token, nameAction);
  }
}
