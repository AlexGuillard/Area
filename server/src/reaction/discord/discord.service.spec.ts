import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('DiscordService', () => {
  let service: DiscordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
