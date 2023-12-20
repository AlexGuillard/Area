import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ActionModule } from './action.module';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, PrismaModule, ActionModule, EventEmitterModule.forRoot()],
      providers: [ActionService, MeService, AboutService],
    }).compile();

    service = module.get<ActionService>(ActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
