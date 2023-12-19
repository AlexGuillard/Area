import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiParam } from '@nestjs/swagger';

@Controller(':token/')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @Get('services')
    @ApiParam({
      name: 'token',
      required: true,
      description: 'Token of the user',
    })
    getServices(@Param('token') token: string) {
        return this.servicesService.getServices(token);
    }
}
