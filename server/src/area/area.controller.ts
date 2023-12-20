import { Controller, Get, Param } from '@nestjs/common';
import { AreaService } from './area.service';

@Controller(':token/')
export class AreaController {
    constructor(private areaService: AreaService) {}

    @Get('areas')
    getAreas(@Param('token') token: string) {
      return this.areaService.getAreas(token);
    }
}
