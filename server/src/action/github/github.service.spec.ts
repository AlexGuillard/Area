import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActionModule } from '../action.module';
import { ActionService } from '../action.service';
import { MeService } from '../../me/me.service';
import { AboutService } from '../../about/about.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, ActionService, MeService, AboutService],
      imports: [EventEmitterModule.forRoot(), ActionModule, PrismaModule],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
