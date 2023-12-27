import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DiscordService', () => {
  let service: DiscordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService, PrismaService],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
