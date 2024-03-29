import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyService } from './spotify.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActionModule } from '../action.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('SpotifyService', () => {
  let service: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyService, PrismaService],
      imports: [EventEmitterModule.forRoot(), ActionModule],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
