import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ActionService } from './action.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('actions')
@Controller('actions')
export class ActionController {
  constructor(private authService: ActionService) {}

  @Get()
  getActions(@Headers('token') token: string) {
    return this.authService.getActions(token);
  }
  @Get(':nameAction')
  getReactionInfo(@Headers('token') token: string, @Param('nameAction') nameAction: string) {
    return this.authService.getActionInfo(token, nameAction);
  }
}
