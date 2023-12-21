import { Test, TestingModule } from '@nestjs/testing';
import { ReactionService } from './reaction.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { ReactionModule } from './reaction.module';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('ReactionService', () => {
  let service: ReactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionService, MeService, AboutService],
      imports: [
        HttpModule,
        PrismaModule,
        ReactionModule,
        EventEmitterModule.forRoot(),
      ],
    }).compile();

    service = module.get<ReactionService>(ReactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
