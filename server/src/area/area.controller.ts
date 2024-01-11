import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { AreaService } from './area.service';
import { NewAreaDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('areas')
@Controller('areas')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  getAreas(@Headers('token') token: string) {
    return this.areaService.getAreas(token);
  }
  @Get(':id')
  getArea(@Headers('token') token: string, @Param('id') id: string) {
    return this.areaService.getArea(token, id);
  }
  @Post()
  setAreas(@Headers('token') token: string, @Body() body: NewAreaDto) {
    return this.areaService.setAreas(token, body);
  }
  @Delete(':id')
  deleteArea(@Headers('token') token: string, @Param('id') id: string) {
    return this.areaService.deleteArea(token, id);
  }
  @Put(':id')
  changeArea(@Headers('token') token: string, @Param('id') id: string, @Body() body: NewAreaDto) {
    return this.areaService.changeArea(token, id, body);
  }
}
