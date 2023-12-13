import { Controller, Get, Res, Req } from '@nestjs/common';
import { AboutService } from './about.service';
import { Response, Request } from 'express';

@Controller()
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get('/about.json')
  getAbout(@Res() res: Response, @Req() req: Request): void {
    this.aboutService.getAbout(res, req);
  }
}
