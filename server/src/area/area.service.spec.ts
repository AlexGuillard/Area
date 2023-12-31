import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AreaModule } from './area.module';
import { MeModule } from '../me/me.module';
import { HttpModule } from '@nestjs/axios';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';

describe('AreaService', () => {
  let service: AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaService, MeService, AboutService],
      imports: [HttpModule, PrismaModule, AreaModule, MeModule],
    }).compile();

    service = module.get<AreaService>(AreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
