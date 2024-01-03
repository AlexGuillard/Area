import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller(':token/')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get('services')
  @ApiParam({
    name: 'token',
    required: true,
    description: 'Token of the user',
  })
  @ApiOperation({
    summary: 'route to get every services of the connected user',
  })
  @ApiResponse({
    status: 200,
    description: 'Return every services of the connected user',
  })
  getServices(@Param('token') token: string) {
    return this.servicesService.getServices(token);
  }
}
