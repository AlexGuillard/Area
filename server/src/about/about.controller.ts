import { Controller, Get, Ip } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutDto } from './dto';

@Controller()
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get('/about.json')
  getAbout(@Ip() ip: Request): AboutDto {
    return this.aboutService.getAbout(ip);
  }
}
