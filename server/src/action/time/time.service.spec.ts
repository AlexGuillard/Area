import { Test, TestingModule } from '@nestjs/testing';
import { TimeService } from './time.service';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActionModule } from '../action.module';
import { ActionService } from '../action.service';
import { MeService } from '../../me/me.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AboutService } from '../..//about/about.service';

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeService, ActionService, MeService, AboutService],
      imports: [EventEmitterModule.forRoot(), ActionModule, HttpModule, PrismaModule],
    }).compile();

    service = module.get<TimeService>(TimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
