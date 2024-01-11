import { Controller, Get, Param, Headers, Body, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceDto } from './dto';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
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
  getServices(@Headers('token') token: string) {
    return this.servicesService.getServices(token);
  }

  @Post("connexion")
  connexionService(@Headers('token') randomToken: string, @Body() body: ServiceDto) {
    return this.servicesService.connexionService(randomToken, body);
  }
}
