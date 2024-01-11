import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { ActionService } from '../action.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MeService } from '../../me/me.service';
import { AboutService } from '../../about/about.service';

describe('DiscordService', () => {
  let service: DiscordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService, ActionService, PrismaService, MeService, AboutService],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
